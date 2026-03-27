import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import BackgroundComponent from '../../components/Background';
import { Container } from "../../components/Background/styles";
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";
import { ScrollContent, Product } from "./styles";
import api from "../../services/api";

function Edit({ toggleTheme }) {
    const showBars = scroll();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    async function fetchProducts() {
        try {
            const response = await api.get("/products");
            setProducts(response.data);
        } catch (err) {
        }
    }

    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Deseja excluir este produto definitivamente?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/products/${id}`);

            setProducts(prev =>
                prev.filter(product => product.id !== id)
            );
        } catch (err) {
            alert("Erro ao excluir produto");
        }
    }

    const filteredProducts = products
        .filter(product =>
            product.name
                .toLowerCase()
                .startsWith(search.toLowerCase())
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
                showAddButton={true}
                onAddClick={() => navigate("/products/create")}
            />
            <Container>
                <ScrollContent style={{ marginTop: "2vh" }}>
                    {filteredProducts.map(product => (
                        <Product key={product.id}>
                            <div className="info">
                                <p>{product.name}</p>
                            </div>

                            <div className="actions">
                                <button
                                    onClick={() => navigate(`/products/edit-product/${product.id}`)}
                                    title="Editar produto"
                                >
                                    <span className="material-icons-outlined">
                                        settings
                                    </span>
                                </button>

                                <button
                                    onClick={() => handleDelete(product.id)}
                                    title="Excluir produto"
                                >
                                    <span className="material-icons-outlined">
                                        delete
                                    </span>
                                </button>

                            </div>
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

export default Edit;