import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackgroundComponent from "../../components/Background";
import { Container } from "../../components/Background/styles";
import HeroComponent from "../../components/Hero";
import FooterComponent from "../../components/Footer";
import { scroll } from "../../components/scroll";
import { useCart } from "../../contexts/CartContext";

import { Content } from "../Login/styles";
import { ItemsWrapper, Title, Empty, Back, Item, ItemImage, ItemInfo, ItemActions, QuantityControl, RemoveButton, Summary, Total, FinishButton } from "./styles";

function Cart({ toggleTheme }) {
    const showBars = scroll();
    const navigate = useNavigate();

    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        total,
        clearCart
    } = useCart();

    function handleFinish() {
        if (cartItems.length === 0) return;

        console.log("Pedido enviado:", cartItems);

        clearCart();
        navigate("/");
    }

    return (
        <BackgroundComponent>
            <HeroComponent
                visible={showBars}
                toggleTheme={toggleTheme}
                showSearch={false}
            />
            <Container>
                <Content>
                    <Title>
                        Sacola
                    </Title>

                    {cartItems.length === 0 ? (
                        <Empty>
                            <p>Sua sacola está vazia</p>
                            <Back onClick={() => navigate("/")}>
                                Voltar
                            </Back>
                        </Empty>
                    )
                        : (
                            <>
                                <ItemsWrapper>
                                    {cartItems.map(item => (
                                        <Item key={item.id}>
                                            <ItemImage>
                                                {item.imageUrl && (
                                                    <img
                                                        src={`http://localhost:3000/images/${item.imageUrl.replace("uploads/", "")}`}
                                                        alt={item.name}
                                                    />
                                                )}
                                            </ItemImage>
                                            <ItemInfo>
                                                <h3>{item.name}</h3>
                                                <span>{item.size}</span>
                                                <p>R$ {item.price.toFixed(2)}</p>
                                            </ItemInfo>

                                            <ItemActions>
                                                <QuantityControl>
                                                    <button onClick={() => decreaseQuantity(item.id)}>−</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                                                </QuantityControl>

                                                <RemoveButton onClick={() => removeFromCart(item.id)}>
                                                    Remover
                                                </RemoveButton>
                                            </ItemActions>
                                        </Item>
                                    ))}
                                </ItemsWrapper>
                                <Summary>
                                    <Total>
                                        Total: <span>R$ {total.toFixed(2)}</span>
                                    </Total>

                                    <FinishButton onClick={handleFinish}>
                                        Finalizar Pedido
                                    </FinishButton>
                                </Summary>

                            </>

                        )}
                </Content>
            </Container>
            <FooterComponent
                visible={showBars}
                onProfileClick={() => navigate("/profile")}
            />
        </BackgroundComponent>
    );
}

export default Cart;