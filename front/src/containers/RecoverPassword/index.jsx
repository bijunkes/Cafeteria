import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackgroundComponent from '../../components/Background';
import { Container } from '../../components/Background/styles';
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";

import { Content, Title, Input, InputContent, ForgotPassword, Button, Sign } from "../Login/styles"
import { authService } from '../../services/auth';

function RecoverPassword({ toggleTheme }) {
    const showBars = scroll();
    const navigate = useNavigate();

    const { token } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    async function handleReset() {
        if (!password || !confirmPassword) {
            return alert("Preencha todos os campos");
        }

        if (password !== confirmPassword) {
            return alert("As senhas não coincidem");
        }

        try {
            await authService.resetPassword({
                token,
                password
            });

            alert("Senha redefinida com sucesso");
            navigate("/login");

        } catch (err) {
            alert(err.response?.data?.error || "Erro ao redefinir senha");
        }
    }

    return (
        <BackgroundComponent>
            <HeroComponent
                visible={showBars}
                toggleTheme={toggleTheme}
                showSearch={false}
            />
            <Container>
                <Content>
                    <Title>
                        Redefinir senha
                    </Title>

                    <Input>
                        <span className="material-icons-outlined" style={{ fontSize: "18px" }}>
                            {"lock"}
                        </span>

                        <InputContent
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        <span
                            className="material-icons-outlined" style={{ fontSize: "18px", cursor: "pointer" }}
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? "visibility_off" : "visibility"}
                        </span>
                    </Input>

                    <Input>
                        <span className="material-icons-outlined" style={{ fontSize: "18px" }}>
                            {"lock"}
                        </span>

                        <InputContent
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirmar senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />

                        <span
                            className="material-icons-outlined" style={{ fontSize: "18px", cursor: "pointer" }}
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? "visibility_off" : "visibility"}
                        </span>
                    </Input>

                    <Button onClick={() => handleReset()}>Alterar senha</Button>

                </Content>
            </Container>
            <FooterComponent
                visible={showBars}
            />
        </BackgroundComponent>
    );
}

export default RecoverPassword;