import React from "react";
import { useNavigate } from 'react-router-dom';

import BackgroundComponent from '../../components/Background';
import { Container } from "../../components/Background/styles";
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";
import { Title, Button } from "./styles";
import { Content } from "../Login/styles";
import { Admin } from "../Profile/styles";

function Products({ toggleTheme }) {
    const showBars = scroll();
    const navigate = useNavigate();

    return (
        <BackgroundComponent>
            <HeroComponent
                visible={showBars}
                toggleTheme={toggleTheme}
                showSearch={false}
            />
            <Container>
                <Content>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2vh",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1
                    }}>
                        <Title style={{marginBottom: "2vh"}}>
                            Configurações
                        </Title>
                        <Button onClick={() => navigate("/products/edit")}>
                            Produtos
                        </Button>

                        <Button onClick={() => navigate("/orders")}>
                            Pedidos
                        </Button>
                    </div>
                    <Admin style={{ marginTop: "auto" }} onClick={() => navigate("/profile")} title="Voltar">
                        <span className="material-icons-outlined" style={{ fontSize: "18px" }}>
                            {"arrow_back"}
                        </span>
                    </Admin>
                </Content>
            </Container>
            <FooterComponent
                visible={showBars}
                onProfileClick={() => navigate("/profile")}
            />
        </BackgroundComponent>
    )
}

export default Products;