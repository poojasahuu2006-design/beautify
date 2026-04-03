import { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const login = (email, password) => {
        if (email && password) {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    return (
        <ShopContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                wishlist,
                toggleWishlist,
                isInWishlist,
                searchQuery,
                setSearchQuery
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};
