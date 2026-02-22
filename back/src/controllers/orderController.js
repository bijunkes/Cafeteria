import prisma from "../../prisma/client.js";

export async function createOrder(req, res) {
    try {
        const { items, total, customerName, table } = req.body;
        const userId = req.user?.id;

        const order = await prisma.order.create({
            data: {
                customerName,
                table,
                total,
                userId,
                items: {
                    create: items.map(item => ({
                        quantity: item.quantity,
                        productId: item.productId,
                        productOptionId: item.productOptionId
                    }))
                }
            },
            include: {
                items: {
                    include: {
                        product: true,
                        productOption: true
                    }
                }
            }
        });
        return res.status(201).json(order);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao criar pedido" });
    }
}

export async function getAllOrders(req, res) {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                items: {
                    include: {
                        product: true,
                        productOption: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return res.json(orders);

    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "Erro ao buscar pedidos"});
    }
}