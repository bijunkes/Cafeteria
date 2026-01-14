import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import api from '../../services/api';
import { productService } from '../../services/auth';

import { scroll } from "../../components/scroll";

import HeroComponent from "../../components/Hero";
import FooterComponent from "../../components/Footer";
import BackgroundComponent from "../../components/Background";

import { Content, Title } from '../Login/styles.js';
import { Field, Label, Input, InputContent, Save, Side, Logout, Admin } from './styles.js';

function Profile({ toggleTheme }) {
    const showBars = scroll();
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(`${user?.name}`);
    const [email, setEmail] = useState(`${user?.email}`);
    const [password, setPassword] = useState("");

    function handleLogout() {
        logout();
        navigate("/login");
    }

    async function handleTestAdmin() {
        try {
            const response = await api.post("/products");
            alert(response.data.message);
        } catch (err) {
            alert("Erro");
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
                    Perfil
                </Title>
                <Field>
                    <Label>Nome</Label>
                    <Input>
                        <InputContent value={name} />
                    </Input>
                </Field>
                <Field>
                    <Label>Email</Label>
                    <Input>
                        <InputContent value={email} />
                    </Input>
                </Field>
                <Field>
                    <Label>Senha</Label>
                    <Input>
                        <InputContent value={password} />
                    </Input>
                </Field>
                <Save>Salvar</Save>
                <Side>
                    <Logout onClick={handleLogout}>
                        <span className="material-icons-outlined" style={{ fontSize: "18px" }}>
                            {"logout"}
                        </span>
                    </Logout>
                    {user?.role === "admin" && (
                        <Admin onClick={() => navigate("/products")}>
                            <span className="material-icons-outlined" style={{ fontSize: "18px" }}>
                                {"settings"}
                            </span>
                        </Admin>
                    )}
                </Side>
            </Content>
            <FooterComponent
                visible={showBars}
            />
        </BackgroundComponent>
    );
}

export default Profile;