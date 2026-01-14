import bcrypt from "bcrypt";
import prisma from "../../prisma/client.js";
import jwt from "jsonwebtoken";


export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({error: "Campos obrigatórios"});
        }

        const existingUser = await prisma.user.findUnique({
            where: {email: email.toLowerCase().trim()}
        });

        if (existingUser) {
            return res.status(400).json({error: "Email já cadastrado"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name, 
                email, 
                password: hashedPassword, 
                role: "user"
            }
        });

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });

    } catch (err) {
        res.status(500).json({ error: "Erro no servidor" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Campos obrigatórios" });
        }

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
            select: { id: true, name: true, email: true, password: true, role: true }
        });

        if (!user) {
            return res.status(401).json({ error: "Email ou senha invalálidos" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Email ou senha inválidos" });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
            token
        });
    } catch (err) {
        res.status(500).json({ error: "Erro no servidor" });
    }
}