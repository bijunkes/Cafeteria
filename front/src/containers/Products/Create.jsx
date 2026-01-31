import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BackgroundComponent from '../../components/Background';
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";
import { SubmitButton, Table, Title, TableCell, Select, Aside } from "./styles";
import { Content, Input, InputContent } from "../Login/styles";
import api from "../../services/api";

function CreateProduct({ toggleTheme }) {
    const showBars = scroll();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [prices, setPrices] = useState({
        PEQUENO: "",
        MEDIO: "",
        GRANDE: ""
    });
    const [type, setType] = useState("");

    const COFFEE_TYPES = [
        "Classico",
        "Com_leite",
        "Especial",
        "Gelado"
    ];

    const [recommended, setRecommended] = useState(false);
    const [inStock, setInStock] = useState(true);

    const isValid =
        name.trim() &&
        description.trim() &&
        type.trim() &&
        image &&
        Object.values(prices).every(
            price => price && Number(price.replace(",", ".")) > 0
        );

    function formatCurrencyBR(value) {
        value = value.replace(/\D/g, "");
        value = (Number(value) / 100).toFixed(2);

        return value
            .replace(".", ",")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function reset() {
        setName("");
        setDescription("");
        setImage(null);
        setType("");
        setRecommended(false);
        setInStock(true);
        setPrices({
            PEQUENO: "",
            MEDIO: "",
            GRANDE: ""
        });
    }

    async function handleSubmit() {
        if (!isValid) return;

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("type", type);
        formData.append("recommended", recommended);
        formData.append("inStock", inStock);
        formData.append("image", image);

        formData.append(
            "options",
            JSON.stringify([
                {
                    size: "PEQUENO",
                    price: Number(prices.PEQUENO.replace(".", "").replace(",", "."))
                },
                {
                    size: "MEDIO",
                    price: Number(prices.MEDIO.replace(".", "").replace(",", "."))
                },
                {
                    size: "GRANDE",
                    price: Number(prices.GRANDE.replace(".", "").replace(",", "."))
                }
            ])
        );

        try {
            await api.post("/products", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            alert("Produto cadastrado");
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            reset();
        } catch (err) {
            alert(err.response?.data?.error || "Erro ao cadastrar produto");
        }

    }

    const bottomRef = useRef(null);

    useEffect(() => {
        if (isValid && bottomRef.current) {
            bottomRef.current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [isValid]);

    return (
        <BackgroundComponent>
            <HeroComponent
                visible={showBars}
                toggleTheme={toggleTheme}
                showSearch={false}
            />
            <Content>
                <Title>Cadastrar produto</Title>
                <Input>
                    <span className="material-icons-outlined" style={{ fontSize: "18px" }}>
                        {"local_cafe"}
                    </span>
                    <InputContent
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
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
                        onChange={(e) => setDescription(e.target.value)}
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
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">Classificação</option>
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
                            onChange={(e) => setRecommended(e.target.checked)}
                        />
                        Recomendado
                    </Input>

                    <Input>
                        <input
                            type="checkbox"
                            checked={inStock}
                            onChange={(e) => setInStock(e.target.checked)}
                        />
                        Em estoque
                    </Input>
                </Aside>

                <Table>
                    <TableCell>P</TableCell>
                    <TableCell>M</TableCell>
                    <TableCell>G</TableCell>

                    <TableCell>
                        <InputContent
                            style={{
                                width: "100%",
                                textAlign: "center",
                                boxSizing: "border-box"
                            }}
                            placeholder="R$ 0,00"
                            value={prices.PEQUENO ? `R$ ${prices.PEQUENO}` : ""}
                            onChange={(e) =>
                                setPrices(prev => ({
                                    ...prev,
                                    PEQUENO: formatCurrencyBR(
                                        e.target.value.replace("R$", "").trim()
                                    )
                                }))
                            }
                            inputMode="numeric"
                        />
                    </TableCell>

                    <TableCell>
                        <InputContent
                            style={{
                                width: "100%",
                                textAlign: "center",
                                boxSizing: "border-box"
                            }}
                            placeholder="R$ 0,00"
                            value={prices.MEDIO ? `R$ ${prices.MEDIO}` : ""}
                            onChange={(e) =>
                                setPrices(prev => ({
                                    ...prev,
                                    MEDIO: formatCurrencyBR(
                                        e.target.value.replace("R$", "").trim()
                                    )
                                }))
                            }
                            inputMode="numeric"
                        />
                    </TableCell>

                    <TableCell>
                        <InputContent
                            style={{
                                width: "100%",
                                textAlign: "center",
                                boxSizing: "border-box"
                            }}
                            placeholder="R$ 0,00"
                            value={prices.GRANDE ? `R$ ${prices.GRANDE}` : ""}
                            onChange={(e) =>
                                setPrices(prev => ({
                                    ...prev,
                                    GRANDE: formatCurrencyBR(
                                        e.target.value.replace("R$", "").trim()
                                    )
                                }))
                            }
                            inputMode="numeric"
                        />
                    </TableCell>
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
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={{ display: "none" }}
                    />
                </Input>

                <SubmitButton
                    $visible={isValid} onClick={handleSubmit}
                >Cadastrar</SubmitButton>
                <div ref={bottomRef} />
            </Content>
            <FooterComponent
                visible={showBars}
                onProfileClick={() => navigate("/profile")}
            />
        </BackgroundComponent>
    );
}

export default CreateProduct;