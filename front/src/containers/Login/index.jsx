import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

import BackgroundComponent from '../../components/Background';
import HeroComponent from '../../components/Hero';
import FooterComponent from '../../components/Footer';
import { scroll } from "../../components/scroll";

import { Content, Title, Input, InputContent, ForgotPassword, Button, Sign } from './styles';

function Login({ toggleTheme, themeAtual }) {
    const showBars = scroll();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

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

                    <InputContent 
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha" />

                    <span
                        className="material-icons-outlined" style={{fontSize:"18px", cursor:"pointer"}}
                        onClick={() => setShowPassword(prev =>!prev)}
                    >
                        {showPassword ? "visibility_off" : "visibility"}
                    </span>
                </Input>
                
                <ForgotPassword>Esqueceu a senha?</ForgotPassword>

                <Button>Login</Button>

                <Sign>
                    Não possui cadastro?
                    <span onClick={() => navigate("/signup")}> Sign Up</span>
                </Sign>
            </Content>

            <FooterComponent
                visible={showBars}
            />
        </BackgroundComponent>
    );
}

export default Login;