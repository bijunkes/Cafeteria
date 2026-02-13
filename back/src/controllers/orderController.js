async function createOrder(req, res) {
    const {items, total} = req.body;
    const userId = req.user.id;

    const order = await Order.create({
        userId, total, items
    });

    return res.status(201).json(order);
}