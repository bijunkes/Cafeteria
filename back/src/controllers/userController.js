import prisma from "../../prisma/client.js";

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