import React, { createContext, useContext, useEffect, useState } from "react";
import { Quantity } from "../containers/Product/styles";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cafe-cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cafe-cart", JSON.stringify(cartItems));
    }, [cartItems]);

    function addToCart(product) {
        setCartItems(prev => {
            const itemExists = prev.find(item => item.id === product.id);

            if (itemExists) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            }
            return [...prev, product];
        });
    }

    function removeFromCart(id) {
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    function increaseQuantity(id) {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    function decreaseQuantity(id) {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    }

    function clearCart() {
        setCartItems([]);
    }

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}