import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import BackgroundComponent from '../../components/Background';
import { Container } from "../../components/Background/styles";
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";
import { ScrollContent, Edit, Title } from "./styles";
import { Input, InputContent } from "../Login/styles";

import api from "../../services/api";

function EditProduct({ toggleTheme }) {
    const showBars = scroll();
    const navigate = useNavigate();

    const { id } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [recommended, setRecommended] = useState(false);
    const [inStock, setInStock] = useState(true);
    const [options, setOptions] = useState([]);
    const [image, setImage] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("type", type);
            formData.append("recommended", recommended);
            formData.append("inStock", inStock);

            if (image) {
                formData.append("image", image);
            }

            await api.put(`/products/${id}`, formData);

            alert("Produto atualizado");
            navigate("/products/edit");

        } catch (err) {
            console.log(err);
            alert("Erro ao atualizar produto");
        }
    }

    useEffect(() => {
        async function loadProduct() {
            const res = await api.get(`/products/${id}`);
            const product = res.data;

            setName(product.name);
            setDescription(product.description);
            setType(product.type);
            setRecommended(product.recommended);
            setInStock(product.inStock);
            setOptions(product.options);
        }

        loadProduct();
    }, [id]);

    return (
        <BackgroundComponent>
            <HeroComponent
                visible={showBars}
                toggleTheme={toggleTheme}
                showSearch={false}
            />
            <Container>
                <ScrollContent>
                    <Title>Editar produto</Title>
                    <Edit as="form" onSubmit={handleSubmit}>
                        <Input>
                            <span className="material-icons-outlined" style={{ fontSize: "18px" }}>
                                {"local_cafe"}
                            </span>
                            <InputContent
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Nome"></InputContent>
                        </Input>




                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Descrição"
                        />

                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                        >
                            <option value="Classico">Clássico</option>
                            <option value="Com_leite">Com leite</option>
                            <option value="Especial">Especial</option>
                            <option value="Gelado">Gelado</option>
                        </select>

                        <label>
                            <input
                                type="checkbox"
                                checked={recommended}
                                onChange={e => setRecommended(e.target.checked)}
                            />
                            Recomendado
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={inStock}
                                onChange={e => setInStock(e.target.checked)}
                            />
                            Em estoque
                        </label>

                        <input
                            type="file"
                            onChange={e => setImage(e.target.files[0])}
                        />

                        <button type="submit">
                            Salvar alterações
                        </button>
                    </Edit>
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