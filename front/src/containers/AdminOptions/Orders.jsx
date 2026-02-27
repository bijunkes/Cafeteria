import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import api from "../../services/api";

import BackgroundComponent from '../../components/Background';
import { Container } from "../../components/Background/styles";
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";
import { ScrollContent, Title, OrderStatus, Order, OrderId, OrderInfo, ReadyButton } from "./styles";
import { Aside } from "./styles";

function Orders({ toggleTheme }) {
    const showBars = scroll();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("pendentes");

    async function fetchOrders() {
        try {
            const response = await api.get("/orders");
            setOrders(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function markAsReady(id) {
        try {
            await api.patch(`/orders/${id}/status`, {
                status: "pronto"
            });

            fetchOrders();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order => {
        if (filter === "pendentes") {
            return order.status !== "pronto";
        }
        return order.status === "pronto";
    });

    return (
        <BackgroundComponent>
            <HeroComponent
                visible={showBars}
                toggleTheme={toggleTheme}
                showSearch={false}
            />
            <Container>
                <ScrollContent>
                    <Title>
                        Pedidos
                    </Title>
                    <Aside>
                        <OrderStatus
                            active={filter === "pendentes"}
                            onClick={() => setFilter("pendentes")}>
                            Pendentes
                        </OrderStatus>
                        <OrderStatus
                            active={filter === "finalizados"}
                            onClick={() => setFilter("finalizados")}>
                            Finalizados
                        </OrderStatus>
                    </Aside>
                    {filteredOrders.map(order => (
                        <Order key={order.id}>
                            <OrderId>Pedido #{order.id}</OrderId>
                            <OrderInfo>
                                <p>Cliente: {order.customerName}</p>
                                <p>Mesa: {order.table}</p>
                                <p>Status: {order.status}</p>
                            </OrderInfo>
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.id}>
                                        {item.quantity}x {item.product.name} ({item.productOption.size})
                                    </li>
                                ))}
                            </ul>
                            {order.status !== "pronto" && (
                                <ReadyButton onClick={() => markAsReady(order.id)}>
                                    <span className="material-icons-outlined">
                                        check_box
                                    </span>
                                </ReadyButton>
                            )}
                        </Order>
                    ))}
                </ScrollContent>
            </Container>
            <FooterComponent
                visible={showBars}
                onProfileClick={() => navigate("/profile")}
            />
        </BackgroundComponent>
    )
}

export default Orders;