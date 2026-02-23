import React, { useEffect, useState } from "react";

import api from "../../services/api";

import BackgroundComponent from '../../components/Background';
import { Container } from "../../components/Background/styles";
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";
import { ScrollContent, Title, Order } from "./styles";

function Orders({ toggleTheme }) {
    const showBars = scroll();

    const [orders, setOrders] = useState([]);

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
                    {orders.map(order => (
                        <Order>
                            A
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