import prisma from "../../prisma/client.js";
import bcrypt from "bcrypt";

export async function getMe(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {id: req.userId},
            select: {id: true, name: true, email: true, role: true}
        });

        if (!user) {
            return res.status(404).json({error: "Usuáro não encontrado"});
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json({error: "Erro no servidor"});
    }
}

export async function updateMe(req, res) {
    try {
        const userId = req.userId;
        const {name, email, password} = req.body || {};

        const dataUpdate = {};

        if (name) {
            dataUpdate.name = name;
        }

        if (email) {
            dataUpdate.email = email.toLowerCase().trim();
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            dataUpdate.password = hashedPassword;
        }

        if (Object.keys(dataUpdate).length === 0) {
            return res.status(400).json({error: "Nada a atualizar"});
        }

        const userUpdate = await prisma.user.update({
            where: {id: userId},
            data: dataUpdate,
            select: {id: true, name: true, email: true, role: true}
        });

        return res.json(userUpdate);
    } catch {
        return res.status(500).json({error: "Erro no servidor"});
    }
}