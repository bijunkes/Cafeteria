import bcrypt from "bcrypt";
import prisma from "../../prisma/client.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

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

export async function recoverPassword(req, res) {
    try {
        const {email} = req.body;

        if (!email) {
            return res.status(400).json({error: "Email é obrigatório"});
        }

        const user = await prisma.user.findUnique({
            where: {email: email.toLowerCase().trim()}
        });

        if (!user) {
            return res.json({message: "Se o email existir, instruções serão enviadas"});
        }

        const token = crypto.randomBytes(20).toString("hex");

        await prisma.user.update({
            where: {id: user.id},
            data: {
                resetToken: token,
                resetTokenExpires: new Date(Date.now() + 3600000)
            }
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const link = `http://localhost:5173/reset-password/${token}`;

        await transporter.sendMail({
            from: `"Cafe Shop" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Recuperação de senha",
            text: `Clique no link para redefinir sua senha: ${link}`
        });

        return res.json({ message: "Email enviado" });
    } catch (err) {
        return res.status(500).json({ error: "Erro ao enviar email" });
    }
}

export async function resetPassword(req, res) {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ error: "Dados obrigatórios" });
        }

        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpires: {
                    gte: new Date()
                }
            }
        });

        if (!user) {
            return res.status(400).json({ error: "Token inválido ou expirado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpires: null
            }
        });

        return res.json({ message: "Senha redefinida com sucesso" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Erro ao redefinir senha" });
    }
}