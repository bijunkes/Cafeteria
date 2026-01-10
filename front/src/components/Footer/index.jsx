import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer, FooterButton } from "./styles";

function FooterComponent({ visible, onProfileClick }) {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <Footer $visible={visible} >
            <FooterButton
                active={isActive("/")}
                onClick={() => navigate("/")}
            >
                <span className="material-icons-outlined">
                    {"home"}
                </span>
                Home
            </FooterButton>

            <FooterButton
                active={isActive("/bag")}
                onClick={() => navigate("/bag")}
            >
                <span className="material-icons-outlined">
                    {"shopping_bag"}
                </span>
                Sacola
            </FooterButton>

            <FooterButton
                active={isActive("/login") || isActive("/profile")}
                onClick={onProfileClick}
            >
                <span className="material-icons-outlined">
                    {"person"}
                </span>
                Perfil
            </FooterButton>
        </Footer>
    );
}

export default FooterComponent;