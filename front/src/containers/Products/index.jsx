import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";

import BackgroundComponent from '../../components/Background';
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";
import { Title, Button } from "./styles";
import { Content } from "../Login/styles";

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
            <Content>
                <Title>Produtos</Title>
                <Button onClick={() => navigate("/products/create")}>Cadastrar</Button>
                <Button onClick={() => navigate("/products/edit")}>Editar</Button>
                <Button onClick={() => navigate("/products/delete")}>Excluir</Button>
            </Content>
            <FooterComponent
                visible={showBars}
                onProfileClick={() => navigate("/profile")}
            />
        </BackgroundComponent>
    )
}

export default Products;