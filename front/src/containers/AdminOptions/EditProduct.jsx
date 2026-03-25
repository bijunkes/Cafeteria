import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import BackgroundComponent from '../../components/Background';
import { Container } from "../../components/Background/styles";
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";
import { ScrollContent, Edit, Title, Select, Table, TableCell } from "./styles";
import { Input, InputContent } from "../Login/styles";
import { Aside } from "./styles";

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

    const COFFEE_TYPES = [
        "Classico",
        "Com_leite",
        "Especial",
        "Gelado"
    ];

    function handlePriceChange(size, value) {
        setOptions(prev =>
            prev.map(option =>
                option.size === size
                    ? { ...option, price: value }
                    : option
            )
        );
    }

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

            console.log(product.options);

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
                <ScrollContent style={{ marginBottom: "10vh" }}>
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

                        <Input
                            style={{
                                height: "14vh",
                                alignItems: "flex-start",
                                padding: "2vh"
                            }}>
                            <span className="material-icons-outlined" style={{ fontSize: "18px" }}>
                                {"info"}
                            </span>
                            <InputContent
                                placeholder="Descrição"
                                as="textarea"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                style={{
                                    height: "100%"
                                }} />
                        </Input>

                        <Input>
                            <span className="material-icons-outlined" style={{ fontSize: "18px" }}>
                                {"tag"}
                            </span>

                            <Select
                                value={type}
                                onChange={e => setType(e.target.value)}
                            >
                                {COFFEE_TYPES.map(t => (
                                    <option key={t} value={t}>
                                        {t.replace("_", " ")}
                                    </option>
                                ))}
                            </Select>
                        </Input>

                        <Aside>
                            <Input>
                                <input
                                    type="checkbox"
                                    checked={recommended}
                                    onChange={e => setRecommended(e.target.checked)}
                                />
                                Recomendado
                            </Input>

                            <Input>
                                <input
                                    type="checkbox"
                                    checked={inStock}
                                    onChange={e => setInStock(e.target.checked)}
                                />
                                Em estoque
                            </Input>
                        </Aside>

                        <Table>
                            <TableCell>P</TableCell>
                            <TableCell>M</TableCell>
                            <TableCell>G</TableCell>

                            {["PEQUENO", "MEDIO", "GRANDE"].map((size) => {
                                const option = options.find(o => o.size === size);

                                return (
                                    <TableCell key={size}>
                                        <InputContent
                                            type="number"
                                            step="0.01"
                                            value={option ? option.price : ""}
                                            onChange={e =>
                                                setOptions(prev =>
                                                    prev.map(o =>
                                                        o.size === size
                                                            ? { ...o, price: parseFloat(e.target.value) }
                                                            : o
                                                    )
                                                )
                                            }
                                        />
                                    </TableCell>
                                );
                            })}
                        </Table>

                        <Input>
                            <span className="material-icons-outlined" style={{ fontSize: "18px" }}>
                                {"image"}
                            </span>
                            <label
                                htmlFor="product-image"
                                style={{
                                    flex: 1,
                                    cursor: "pointer",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis"
                                }} >
                                {image ? image.name : "Selecionar imagem"}
                            </label>
                            {image && (
                                <button
                                    type="button"
                                    onClick={() => setImage(null)}
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                    title="Remover imagem" >
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: "18px", color: "#bf342b" }} >
                                        close
                                    </span>
                                </button>
                            )}
                            <input
                                id="product-image"
                                type="file"
                                style={{ display: "none" }}
                                onChange={e => setImage(e.target.files[0])}
                            />
                        </Input>

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