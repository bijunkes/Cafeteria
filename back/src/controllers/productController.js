import prisma from "../../prisma/client.js";

export async function create(req, res) {
    try {
        const { name, description, type, options } = req.body;

        const recommendedBool = req.body.recommended === "true";
        const inStockBool = req.body.inStock === "true";

        const parsedOptions = JSON.parse(options);

        if (!name || !description || !Array.isArray(parsedOptions) || parsedOptions.length === 0) {
            return res.status(400).json({ error: "Campos obrigatórios" });
        }

        const imageUrl = req.file
            ? `uploads/${req.file.filename}`
            : null;

        const sizes = ["PEQUENO", "MEDIO", "GRANDE"];

        for (const opt of parsedOptions) {
            if (
                !sizes.includes(opt.size) ||
                opt.price <= 0
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
                recommended: recommendedBool,
                inStock: inStockBool,
                options: {
                    create: parsedOptions.map(opt => ({
                        size: opt.size,
                        price: opt.price
                    }))
                }
            },
            include: { options: true }
        });


        return res.status(201).json(product);
    } catch (error) {
        console.error("ERRO AO CRIAR PRODUTO:", error);
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
        const productId = Number(id);

        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
            include: { options: true }
        });

        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        const ratingData = await prisma.review.aggregate({
            where: {
                productId: productId,
            },
            _avg: {
                rating: true,
            },
            _count: {
                rating: true,
            },
        });

        return res.json({
            ...product,
            rating: ratingData._avg.rating ?? 0,
            reviewsCount: ratingData._count.rating,
        });
    } catch {
        return res.status(500).json({ error: "Erro ao buscar produtos" });
    }
}