import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer, FooterContent, FooterButton } from "./styles";

function FooterComponent({ visible, onProfileClick }) {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <Footer $visible={visible} >
            <FooterContent>
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
                    active={isActive("/login") || isActive("/profile") || isActive("/signup")}
                    onClick={onProfileClick}
                >
                    <span className="material-icons-outlined">
                        {"person"}
                    </span>
                    Perfil
                </FooterButton>
            </FooterContent>
        </Footer>
    );
}

export default FooterComponent;