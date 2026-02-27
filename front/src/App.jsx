import React from 'react';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

import GlobalStyle from './styles/reset';
import { light, dark } from './styles/themes';

import { AuthProvider } from './contexts/authContext';
import { CartProvider } from './contexts/CartContext';

import Home from './containers/Home';
import Product from './containers/Product';
import Login from './containers/Login';
import Profile from './containers/Profile';
import SignUp from './containers/SignUp';
import Products from './containers/AdminOptions';
import Cart from './containers/Cart';

import CreateProduct from './containers/AdminOptions/Create';
import EditProduct from './containers/AdminOptions/Edit';

import Orders from './containers/AdminOptions/Orders';

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
                <CartProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Home toggleTheme={toggleTheme} />
                                }
                            />

                            <Route
                                path="/product/:id"
                                element={
                                    <Product toggleTheme={toggleTheme} />
                                }
                            />

                            <Route
                                path="/cart"
                                element={
                                    <Cart toggleTheme={toggleTheme} />
                                }
                            />

                            <Route path="/login" element={
                                <Login toggleTheme={toggleTheme} />
                            } />

                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoute>
                                        <Profile toggleTheme={toggleTheme} />
                                    </PrivateRoute>
                                }
                            />

                            <Route
                                path="/register"
                                element={
                                    <SignUp toggleTheme={toggleTheme} />
                                }
                            />

                            <Route
                                path="/products"
                                element={
                                    <AdminRoute>
                                        <Products toggleTheme={toggleTheme} />
                                    </AdminRoute>
                                }
                            />

                            <Route
                                path="/products/create"
                                element={
                                    <AdminRoute>
                                        <CreateProduct toggleTheme={toggleTheme} />
                                    </AdminRoute>
                                }
                            />

                            <Route
                                path="/products/edit"
                                element={
                                    <AdminRoute>
                                        <EditProduct toggleTheme={toggleTheme} />
                                    </AdminRoute>
                                }
                            />

                            <Route
                                path="/orders"
                                element={
                                    <AdminRoute>
                                        <Orders toggleTheme={toggleTheme} />
                                    </AdminRoute>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;