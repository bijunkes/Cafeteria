import React, { useState, useEffect } from 'react';
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
    const { logout, user, updateUser } = useAuth();
    const navigate = useNavigate();

    const [originalUser, setOriginalUser] = useState(null);
    const [name, setName] = useState(`${user?.name}`);
    const [email, setEmail] = useState(`${user?.email}`);
    const [password, setPassword] = useState("");

    const hasChanges =
        name !== originalUser?.name ||
        email !== originalUser?.email ||
        password.length > 0;

    async function handleSave() {
        if (!originalUser) return;

        try {
            const payload = {};

            if (name !== originalUser.name) {
                payload.name = name;
            }

            if (email !== originalUser.email) {
                payload.email = email;
            }

            if (password) {
                payload.password = password;
            }

            if (Object.keys(payload).length === 0) return;

            const response = await api.put("/users/me", payload);

            updateUser(response.data);
            setOriginalUser(response.data);
            setPassword("");
        } catch (err) {
            alert("Erro ao salvar");
        }
    }


    function handleLogout() {
        logout();
        navigate("/login");
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setOriginalUser(user);
        }
    }, [user]);

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
                        <InputContent value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </Input>
                </Field>
                <Field>
                    <Label>Email</Label>
                    <Input>
                        <InputContent value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Input>
                </Field>
                <Field>
                    <Label>Senha</Label>
                    <Input>
                        <InputContent
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Input>
                </Field>
                    <Save onClick={handleSave} $visible={hasChanges}>Salvar</Save>
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