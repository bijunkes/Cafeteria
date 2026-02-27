import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import BackgroundComponent from '../../components/Background';
import { Container } from "../../components/Background/styles";
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";
import { ScrollContent, Product } from "./styles";
import api from "../../services/api";

function EditProduct({ toggleTheme }) {
    const showBars = scroll();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    async function fetchProducts() {
        try {
            const response = await api.get("/products");
            setProducts(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
            a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" })
        );

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <BackgroundComponent>
            <HeroComponent
                visible={showBars}
                toggleTheme={toggleTheme}
                showSearch={true}
                onSearch={setSearch}
            />
            <Container>
                <ScrollContent style={{ marginTop: "3vh" }}>
                    {filteredProducts.map(product => (
                        <Product key={product.id}>
                            <p>
                                {product.name}
                            </p>
                        </Product>
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

export default EditProduct;