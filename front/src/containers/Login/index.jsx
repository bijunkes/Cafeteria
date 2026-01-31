import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

import BackgroundComponent from '../../components/Background';
import { Container } from '../../components/Background/styles';
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";

import { Content, Title, Input, InputContent, ForgotPassword, Button, Sign } from './styles';
import { authService } from '../../services/auth';

function Login({ toggleTheme }) {
    const showBars = scroll();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        try {
            const { data } = await authService.login({
                email, password
            });
            login(data.user, data.token);
            navigate("/profile");
        } catch (err) {
            alert(err.response?.data?.error || "Erro ao fazer login");
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
                        Login
                    </Title>

                    <Input>
                        <span className="material-icons-outlined" style={{ fontSize: "18px" }}>
                            {"mail"}
                        </span>
                        <InputContent placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Input>

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

                    <ForgotPassword>Esqueceu a senha?</ForgotPassword>

                    <Button onClick={() => handleLogin()}>Login</Button>

                    <Sign>
                        Não possui cadastro?
                        <span onClick={() => navigate("/register")}> Sign Up</span>
                    </Sign>
                </Content>
            </Container>
            <FooterComponent
                visible={showBars}
            />
        </BackgroundComponent>
    );
}

export default Login;