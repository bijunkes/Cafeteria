import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";

import BackgroundComponent from '../../components/Background';
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";
import { Button } from "./styles";

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
            <Button>Cadastrar</Button>
            <Button>Editar</Button>
            <Button>Excluir</Button>
            <FooterComponent
                visible={showBars}
                onProfileClick={() => navigate("/profile")}
            />
        </BackgroundComponent>
    )
}

export default Products;