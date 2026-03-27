import prisma from "../../prisma/client.js";

export async function createOrder(req, res) {
    try {
        const { items, total, customerName, table } = req.body;
        const userId = req.userId;

        const order = await prisma.order.create({
            data: {
                customerName,
                table,
                total,
                ...(userId && { userId }),
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
                createdAt: "asc"
            }
        });
        return res.json(orders);

    } catch (err) {
        return res.status(500).json({error: "Erro ao buscar pedidos"});
    }
}

export async function updateOrderStatus(req, res) {
    try {
        const {id} = req.params;
        const {status} = req.body;

        const order = await prisma.order.update({
            where: {
                id: Number(id)
            },
            data: {
                status
            }
        });

        return res.json(order);
    } catch (err) {
        return res.status(500).json({error: "Erro ao atualizar status"});
    }
}