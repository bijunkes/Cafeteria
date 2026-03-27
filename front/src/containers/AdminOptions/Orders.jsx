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
        }
    }

    async function markAsReady(id) {
        try {
            await api.patch(`/orders/${id}/status`, {
                status: "pronto"
            });

            fetchOrders();
        } catch (err) {
        }
    }

    async function markAsPending(id) {
        try {
            await api.patch(`/orders/${id}/status`, {
                status: "pendente"
            });

            fetchOrders();
        } catch (err) {
        }
    }

    function formatSize(size) {
        if (!size) return "";

        if (size.includes("PEQUENO")) return "P";
        if (size.includes("MEDIO")) return "M";
        if (size.includes("GRANDE")) return "G";

        return size;
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
                            <OrderId>#{order.id}</OrderId>
                            <OrderInfo>
                                <p><span>Cliente:</span> {order.customerName}</p>
                                <p>
                                    <span>Mesa: </span>
                                    {order.table ? order.table : "P/ levar"}
                                </p>
                            </OrderInfo>
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.id}>
                                        {item.quantity}x {item.product.name} ({formatSize(item.productOption.size)})
                                    </li>
                                ))}
                            </ul>
                            <ReadyButton
                                isReady={order.status === "pronto"}
                                onClick={() =>
                                    order.status === "pronto"
                                        ? markAsPending(order.id)
                                        : markAsReady(order.id)
                                }
                            >
                                <span className="material-icons-outlined" />
                            </ReadyButton>
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