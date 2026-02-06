import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { scroll } from "../../components/scroll";
import { Classes, Class, Products, Product, ProductText, Menu, MenuTitle, Items, Item, ItemImage, ItemText, ItemPrice } from "./styles";

import HeroComponent from "../../components/Hero";
import FooterComponent from "../../components/Footer";
import BackgroundComponent from "../../components/Background";
import { Container } from "../../components/Background/styles";

import api from "../../services/api";

function Home({ toggleTheme }) {
    const showBars = scroll();
    const navigate = useNavigate();
    const { user } = useAuth();

    const categories = ["Favoritos", "Clássicos", "Com leite", "Especiais", "Gelados"];
    const [activeIndex, setActiveIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const menuProducts = [...products].sort((a, b) =>
        a.name.localeCompare(b.name, "pt-BR")
    );

    const productsRef = useRef(null);

    function handleCategory(index) {
        setActiveIndex(index);
        const category = categories[index];

        if (category === "Favoritos") {
            setFiltered(products.filter(p => p.recommended));
            return;
        }
        const map = {
            "Clássicos": "Classico",
            "Com leite": "Com_leite",
            "Especiais": "Especial",
            "Gelados": "Gelado"
        }
        setFiltered(
            products.filter(p => p.type === map[category])
        );
    }

    useEffect(() => {
        async function loadProducts() {
            try {
                const res = await api.get("/products");
                setProducts(res.data);
                setFiltered(res.data.filter(p => p.recommended));
            } catch (err) {

            }
        }
        loadProducts();
    }, []);

    useEffect(() => {
        if (productsRef.current) {
            productsRef.current.scrollTo({
                left: 0,
                behavior: "smooth"
            });
        }
    }, [filtered]);

    return (
        <BackgroundComponent>
            <HeroComponent
                visible={showBars}
                toggleTheme={toggleTheme}
                showSearch={true}
            />
            <Container>
                <Classes>
                    {categories.map((cat, index) => (
                        <Class
                            key={cat}
                            active={index === activeIndex}
                            onClick={() => handleCategory(index)}
                        >
                            {cat}
                        </Class>
                    ))}
                </Classes>

                <Products ref={productsRef}>
                    {filtered.map(product => (
                        <Product
                            key={product.id}
                            onClick={() => navigate(`/product/${product.id}`)}
                        >
                            {product.imageUrl && (
                                <img src={`http://localhost:3000/images/${product.imageUrl.replace("uploads/", "")}`}
                                    alt={product.name} />
                            )}
                            <ProductText>
                                {product.name}
                            </ProductText>
                        </Product>
                    ))}
                </Products>

                <Menu>
                    <MenuTitle>
                        Cardápio
                    </MenuTitle>
                    <Items>
                        {menuProducts.map(product => (
                            <Item key={product.id}
                                onClick={() => navigate(`/product/${product.id}`)}>
                                <ItemImage>
                                    {product.imageUrl && (
                                        <img
                                            src={`http://localhost:3000/images/${product.imageUrl.replace("uploads/", "")}`}
                                            alt={product.name}
                                        />
                                    )}
                                </ItemImage>

                                <ItemText>
                                    <span className="name">{product.name}</span>
                                    <span className="class">
                                        {product.type.replace("_", " ")}
                                    </span>
                                </ItemText>

                                <ItemPrice>
                                    <span className="currency">R$</span>
                                    <span className="value">
                                        {(() => {
                                            const price = Math.min(...product.options.map(o => o.price))
                                                .toLocaleString("pt-BR", {
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
                                </ItemPrice>
                            </Item>
                        ))}
                    </Items>
                </Menu>
            </Container>
            <FooterComponent
                visible={showBars}
                onProfileClick={() => {
                    if (!user) {
                        navigate("/login");
                    } else {
                        navigate("/profile");
                    }
                }}
            />
        </BackgroundComponent>
    )
}

export default Home;