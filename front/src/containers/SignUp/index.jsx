import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import { scroll } from "../../components/scroll";

import BackgroundComponent from "../../components/Background";
import HeroComponent from "../../components/Hero";
import FooterComponent from "../../components/Footer";

import { Content, Title, Input, InputContent, Button, Sign } from '../Login/styles.js';
import { authService } from "../../services/auth.js";
import { useAuth } from "../../contexts/authContext.jsx";

function SignUp({ toggleTheme, themeAtual }) {
    const showBars = scroll();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSignUp() {
        if (password !== confirmPassword) {
            alert("As senhas não coincidem");
            return;
        }
        try {
            const {data} = await authService.register({
                name, email, password
            });

            login(data.user, data.token);
            navigate("/profile");
        } catch (err) {
            alert(err.response?.data?.error || "Erro ao cadastrar");
        }
    }

    return (
        <BackgroundComponent>
            <HeroComponent
                visible={showBars}
                toggleTheme={toggleTheme}
                showSearch={false}
            />

            <Content>
                <Title>
                    Sign Up
                </Title>

                <Input>
                    <span className="material-icons-outlined" style={{ fontSize: "18px" }}>
                        {"person"}
                    </span>
                    <InputContent placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                </Input>

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

                <Button onClick={handleSignUp}>Sign Up</Button>

                <Sign>
                    Já possui cadastro?
                    <span onClick={() => navigate("/login")}> Sign In</span>
                </Sign>
            </Content>

            <FooterComponent
                visible={showBars}
            />
        </BackgroundComponent>
    )
}

export default SignUp;