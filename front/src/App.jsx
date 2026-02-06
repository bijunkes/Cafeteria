import React from 'react';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

import GlobalStyle from './styles/reset';
import { light, dark } from './styles/themes'
import { AuthProvider } from './contexts/authContext';
import Home from './containers/Home';
import Product from './containers/Product';
import Login from './containers/Login';
import Profile from './containers/Profile';
import SignUp from './containers/SignUp';
import Products from './containers/Products';
import CreateProduct from './containers/Products/Create';
import EditProduct from './containers/Products/Edit';
import DeleteProduct from './containers/Products/Delete';

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
                                <Home toggleTheme={toggleTheme} />
                            }
                        />

                        <Route
                            path="/product/:id"
                            element={
                                <Product toggleTheme={toggleTheme} />
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
                            path="/products/delete"
                            element={
                                <AdminRoute>
                                    <DeleteProduct toggleTheme={toggleTheme} />
                                </AdminRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;