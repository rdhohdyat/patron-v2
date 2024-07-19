import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
    persist(
        (set) => ({
            cart: [],
            total: 0,

            calculateTotal: () =>
                set((state) => ({
                    total: state.cart.reduce(
                        (acc, item) => acc + item.price * item.qty,
                        0
                    ),
                })),

            addToCart: (product) =>
                set((state) => {
                    const existingProduct = state.cart.find(
                        (item) => item.id === product.id
                    );
                    let newCart;
                    if (existingProduct) {
                        newCart = state.cart.map((item) =>
                            item.id === product.id
                                ? { ...item, qty: item.qty + product.qty }
                                : item
                        );
                    } else {
                        newCart = [
                            ...state.cart,
                            { ...product, qty: product.qty },
                        ];
                    }
                    return {
                        cart: newCart,
                        total: newCart.reduce(
                            (acc, item) => acc + item.price * item.qty,
                            0
                        ),
                    };
                }),

            removeFromCart: (productId) =>
                set((state) => {
                    const newCart = state.cart.filter(
                        (item) => item.id !== productId
                    );
                    return {
                        cart: newCart,
                        total: newCart.reduce(
                            (acc, item) => acc + item.price * item.qty,
                            0
                        ),
                    };
                }),

            increaseQty: (productId) =>
                set((state) => {
                    const newCart = state.cart.map((item) =>
                        item.id === productId
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    );
                    return {
                        cart: newCart,
                        total: newCart.reduce(
                            (acc, item) => acc + item.price * item.qty,
                            0
                        ),
                    };
                }),

            decreaseQty: (productId) =>
                set((state) => {
                    const newCart = state.cart.map((item) =>
                        item.id === productId && item.qty > 1
                            ? { ...item, qty: item.qty - 1 }
                            : item
                    );
                    return {
                        cart: newCart,
                        total: newCart.reduce(
                            (acc, item) => acc + item.price * item.qty,
                            0
                        ),
                    };
                }),

            clearCart: () =>
                set({
                    cart: [],
                    total: 0,
                }),
        }),
        {
            name: "cart-storage",
            getStorage: () => localStorage,
        }
    )
);

export default useCartStore;
