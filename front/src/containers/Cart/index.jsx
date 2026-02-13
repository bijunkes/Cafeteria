import React from "react";
import { useNavigate } from "react-router-dom";

import BackgroundComponent from "../../components/Background";
import { Container } from "../../components/Background/styles";
import HeroComponent from "../../components/Hero";
import FooterComponent from "../../components/Footer";
import { scroll } from "../../components/scroll";

function Cart({ toggleTheme }) {
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
    );
}

export default Cart;