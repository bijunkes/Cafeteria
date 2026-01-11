import React from 'react';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';

import GlobalStyle from './styles/reset';
import { light, dark } from './styles/themes'
import { AuthProvider } from './contexts/authContext';
import Home from './containers/Home';
import Login from './containers/Login';
import Profile from './containers/Profile';
import SignUp from './containers/SignUp';

function App() {
    const [theme, setTheme] = useState("light");
    const themeAtual = theme === "light" ? light : dark;

    return (
        <ThemeProvider theme={themeAtual}>
            <GlobalStyle />
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    toggleTheme={() => setTheme(prev => (prev === "light" ? "dark" : "light"))}
                                />
                            }
                        />

                        <Route path="login" element={
                            <Login
                                toggleTheme={() => setTheme(prev => (prev === "light" ? "dark" : "light"))}
                            />
                        }/>

                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <Profile/>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/signup"
                            element={
                                <SignUp
                                    toggleTheme={() => setTheme(prev => (prev === "light" ? "dark" : "light"))}
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;