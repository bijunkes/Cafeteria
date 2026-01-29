import prisma from "../../prisma/client.js";

export async function create(req, res) {
    try {
        const { name, description, imageUrl, type, recommended = false, inStock = true, options } = req.body;

        if (!name || !description || !Array.isArray(options) || options.length === 0) {
            return res.status(400).json({ error: "Campos obrigatórios" });
        }

        const sizes = ["PEQUENO", "MEDIO", "GRANDE"];

        for (const opt of options) {
            if (
                !sizes.includes(opt.size) ||
                opt.price <= 0 ||
                opt.quantite < 0
            ) {
                return res.status(400).json({ error: "Opção inválida" });
            }
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                imageUrl,
                type,
                recommended,
                inStock,
                options: {
                    create: options.map(opt => ({
                        size: opt.size,
                        price: opt.price
                    }))
                }
            },
            include: { options: true }
        });

        return res.status(201).json(product);
    } catch {
        return res.status(500).json({ error: "Erro ao cadastrar produto" });
    }
}

export async function list(req, res) {
    try {
        const products = await prisma.product.findMany({
            include: { options: true }
        });

        return res.json(products);
    } catch {
        return res.status(500).json({ error: "Erro ao listar produtos" });
    }
}

export async function getProduct(req, res) {
    try {
        const { id } = req.params;

        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
            include: { options: true }
        });

        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        return res.json(product);
    } catch {
        return res.status(500).json({ error: "Erro ao buscar produtos" });
    }
}