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

    function toggleTheme() {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    }

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
                                    toggleTheme={toggleTheme}
                                />
                            }
                        />

                        <Route path="/login" element={
                            <Login
                                toggleTheme={toggleTheme}
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
                            path="/register"
                            element={
                                <SignUp
                                    toggleTheme={toggleTheme}
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