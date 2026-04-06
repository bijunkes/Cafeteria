import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackgroundComponent from "../../components/Background";
import { Container } from "../../components/Background/styles";
import HeroComponent from "../../components/Hero";
import FooterComponent from "../../components/Footer";
import { scroll } from "../../components/scroll";
import { useCart } from "../../contexts/CartContext";

import { Content } from "../Login/styles";
import { ItemsWrapper, Title, Empty, Back, Item, ItemImage, ItemInfo, ItemActions, QuantityControl, RemoveButton, Summary, Total, FinishButton, Overlay, CheckoutModal, CheckoutButtons, ModalHeader } from "./styles";

import api from "../../services/api";

function Cart({ toggleTheme }) {
    const showBars = scroll();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showCheckout, setShowCheckout] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [isTakeaway, setIsTakeaway] = useState(false);
    const [table, setTable] = useState("");

    const [step, setStep] = useState(1);
    const [context, setContext] = useState(null); // "LOCAL" | "HOME"
    const [type, setType] = useState(null); // "DINE_IN" | "TAKEAWAY" | "DELIVERY"

    const canConfirm = customerName && (table || isTakeaway);

    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        total,
        clearCart
    } = useCart();

    async function handleFinish() {
        if (!customerName) {
            alert("Preencha os dados corretamente");
            return;
        }

        try {
            setLoading(true);

            const orderData = {
                customerName,
                table: isTakeaway ? null : table,
                isTakeaway,
                total,
                items: cartItems.map(item => ({
                    productId: item.productId,
                    productOptionId: item.productOptionId,
                    quantity: item.quantity
                }))
            };

            await api.post("/orders", orderData);

            clearCart();
            alert("Pedido feito, obrigado pela preferência");
            navigate("/");

        } catch (err) {
            alert("Erro ao finalizar pedido");
        } finally {
            setLoading(false);
        }
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
                                                <RemoveButton onClick={() => removeFromCart(item.id)}>
                                                    <span className="material-icons-outlined">
                                                        {"delete"}
                                                    </span>
                                                </RemoveButton>
                                                <QuantityControl>
                                                    <button onClick={() => decreaseQuantity(item.id)}>−</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                                                </QuantityControl>

                                            </ItemActions>
                                        </Item>
                                    ))}
                                </ItemsWrapper>
                                <Summary>
                                    <Total>
                                        Total: <span>R$ {total.toFixed(2)}</span>
                                    </Total>

                                    <FinishButton onClick={() => setShowCheckout(true)}>
                                        Finalizar pedido
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

            {showCheckout && (
                <Overlay onClick={() => setShowCheckout(false)}>
                    <CheckoutModal onClick={(e) => e.stopPropagation()}>

                        <ModalHeader>
                            {step > 1 && (
                                <button onClick={() => setStep(step - 1)}>
                                    <span className="material-icons-outlined">
                                        arrow_back
                                    </span>
                                </button>
                            )}

                            <h3>
                                {step === 1 && "Como deseja consumir?"}
                                {step === 2 && context === "LOCAL" && "Você vai consumir como?"}
                                {step === 2 && context === "HOME" && "Como deseja receber?"}
                            </h3>
                        </ModalHeader>

                        {step === 1 && (
                            <>
                                <CheckoutButtons onClick={() => {
                                    setContext("LOCAL");
                                    setStep(2);
                                }}>
                                    Estou no local
                                </CheckoutButtons>

                                <CheckoutButtons onClick={() => {
                                    setContext("HOME");
                                    setStep(2);
                                }}>
                                    Estou afora
                                </CheckoutButtons>
                            </>
                        )}

                        {step === 2 && context === "LOCAL" && (
                            <>
                                <CheckoutButtons onClick={() => {
                                    setType("DINE_IN");
                                }}>
                                    Comer aqui
                                </CheckoutButtons>

                                <CheckoutButtons onClick={() => {
                                    setType("TAKEAWAY");
                                }}>
                                    Levar
                                </CheckoutButtons>
                            </>
                        )}

                        {step === 2 && context === "HOME" && (
                            <>
                                <CheckoutButtons onClick={() => {
                                    setType("DELIVERY");
                                }}>
                                    Entrega
                                </CheckoutButtons>

                                <CheckoutButtons onClick={() => {
                                    setType("TAKEAWAY");
                                }}>
                                    Retirar no local
                                </CheckoutButtons>
                            </>
                        )}

                    </CheckoutModal>
                </Overlay>
            )}
        </BackgroundComponent>
    );
}

export default Cart;