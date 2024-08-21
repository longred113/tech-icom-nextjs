'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface CartContextType {
    cartItems: any[];
    fetchCart: () => Promise<any>;
    addToCart: (item: any) => Promise<any>
    updateCart: (item: any) => void;
    clearCart: () => void;
    deleteCartItem: (item: any) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const fetchCart = async () => {
        try {
            const res = await fetch("/api/cart?param=GETCART", {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const data = await res.json();
            setCartItems(data.data.data.cartItems);
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    const addToCart = async (item: any) => {
        if (!cartItems.length) {
            await fetchCart();
        }

        try {
            const res = await fetch("/api/cart?param=ADDTOCART", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    productId: item.id,
                    quantity: 1
                }),
            });

            const itemIndex = cartItems.findIndex((i) => i.id === item.id);

            if (itemIndex === -1) {
                setCartItems(pre => [...pre, item]);
            } else {
                const newCartItems = [...cartItems];
                newCartItems[itemIndex].quantity += 1;
                setCartItems(newCartItems);
            }
            return res.json();
        } catch (e) {
            console.log(e);
        }
    };

    const updateCart = async (item: any) => {
        try {
            const res = await fetch("/api/cart?param=UPDATECARTQUANTITY", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(item),
            });

            const itemIndex = cartItems.findIndex((i) => i.id === item.id);
            const newCartItems = [...cartItems];
            if (item.type === "decrement") {
                newCartItems[itemIndex].quantity -= 1;
            }
            if (item.type === "increment") {
                newCartItems[itemIndex].quantity += 1;
            }
            setCartItems(newCartItems);
            return res.json();
        } catch (error) {
            console.log(error)
        }
    }

    const clearCart = () => {
        setCartItems([]);
    };

    const deleteCartItem = async (item: any) => {
        try {
            await fetch("/api/cart?param=DELETEITEM", {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    productId: item.productId,
                }),
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateCart, fetchCart, clearCart, deleteCartItem }}>
            {children}
        </CartContext.Provider>
    );

}
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};