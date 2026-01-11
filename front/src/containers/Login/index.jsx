import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

import BackgroundComponent from '../../components/Background';
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";

import { Content, Title, Input, InputContent, ForgotPassword, LoginButton, SignUp } from './styles';

function Login({ toggleTheme, themeAtual }) {
    const showBars = scroll();
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <BackgroundComponent>
            <HeroComponent
                visible={showBars}
                toggleTheme={toggleTheme}
                showSearch={false}
            />
            <Content>
                <Title>
                    Login
                </Title>
                <Input>
                    <span className="material-icons-outlined" style={{fontSize:"18px"}}>
                        {"mail"}
                    </span>
                    <InputContent placeholder="Email" />
                </Input>
                <Input>
                    <span className="material-icons-outlined" style={{fontSize:"18px"}}>
                        {"lock"}
                    </span>
                    <InputContent placeholder="Senha" />
                </Input>
                <ForgotPassword>Esqueceu a senha?</ForgotPassword>
                <LoginButton>Login</LoginButton>
                <SignUp>
                    Não possui cadastro?
                    <span> Sign Up</span>
                </SignUp>
            </Content>
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

export default Login;