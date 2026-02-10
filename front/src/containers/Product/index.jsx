import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/api';

import BackgroundComponent from '../../components/Background';
import { Container } from "../../components/Background/styles";
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";
import { Content, BackImage, Image, Rating, Title, Price, Subtitle, Size, Description, Quantity } from './styles';
import { Aside } from '../Products/styles';

function Product({ toggleTheme }) {
    const showBars = scroll();
    const navigate = useNavigate();

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product?.options?.length && !selectedOption) {
            const pequeno = product.options.find(
                o => o.size === "PEQUENO"
            );
            setSelectedOption(pequeno || product.options[0]);
        }
    }, [product, selectedOption]);

    if (!product) {
        return null;
    }

    return (
        <BackgroundComponent>
            <HeroComponent
                toggleTheme={toggleTheme}
                variant="minimal"
            />
            <BackImage>
                <Image>
                    {product?.imageUrl && (
                        <img src={`http://localhost:3000/images/${product.imageUrl.replace("uploads/", "")}`}
                            alt={product.name} />
                    )}
                </Image>
            </BackImage>
            <Container>
                <Content>
                    <Rating>
                        <span className="material-icons-outlined">
                            {"star"}
                        </span>
                        {product.reviewsCount === 0 ? (
                            <span>Novo</span>
                        ) : (
                            <span>
                                {product.rating.toFixed(1)} ({product.reviewsCount})
                            </span>
                        )}

                    </Rating>
                    <Aside>
                        <Title>
                            {product?.name}
                        </Title>
                        <Price>
                            <span className="currency">R$</span>
                            <span className="value">
                                {(() => {
                                    const basePrice = selectedOption?.price
                                        ?? Math.min(...product.options.map(o => o.price));

                                    const price = basePrice.toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    });

                                    const [reais, centavos] = price.split(",");

                                    return (
                                        <span className="value">
                                            <span className="reais">{reais}</span>
                                            <span className="centavos">,{centavos}</span>
                                        </span>
                                    );
                                })()}
                            </span>
                        </Price>
                    </Aside>
                    <Subtitle>
                        Tamanhos
                    </Subtitle>
                    <Aside>
                        <Size
                            $active={selectedOption?.size === "PEQUENO"}
                            onClick={() => {
                                const opt = product.options.find(
                                    Option => Option.size === "PEQUENO"
                                );
                                setSelectedOption(opt);
                            }
                            }
                        >Pequeno</Size>
                        <Size
                            $active={selectedOption?.size === "MEDIO"}
                            onClick={() => {
                                const opt = product.options.find(
                                    Option => Option.size === "MEDIO"
                                );
                                setSelectedOption(opt);
                            }
                            }
                        >Médio</Size>
                        <Size
                            $active={selectedOption?.size === "GRANDE"}
                            onClick={() => {
                                const opt = product.options.find(
                                    Option => Option.size === "GRANDE"
                                );
                                setSelectedOption(opt);
                            }
                            }
                        >Grande</Size>
                    </Aside>
                    <Subtitle>
                        Sobre
                    </Subtitle>
                    <Description>
                        {product?.description}
                    </Description>
                    <Aside>
                        <Subtitle>
                            Volume
                        </Subtitle>
                        <Quantity>

                        </Quantity>
                    </Aside>
                </Content>
            </Container>
            <FooterComponent
                visible={showBars}
                onProfileClick={() => navigate("/profile")}
            />
        </BackgroundComponent>
    )

}

export default Product;