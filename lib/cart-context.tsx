"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/lib/types";

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function emit() {
  listeners.forEach((listener) => listener());
}

function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function useStored<T>(key: string, initial: T) {
  const raw = useSyncExternalStore(subscribe, () => readStorage(key), () => null);

  const value = useMemo(() => {
    if (raw == null) return initial;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return initial;
    }
  }, [raw, initial]);

  const setValue = useCallback(
    (updater: T | ((old: T) => T)) => {
      const current = (() => {
        const stored = readStorage(key);
        if (stored == null) return initial;
        try {
          return JSON.parse(stored) as T;
        } catch {
          return initial;
        }
      })();
      const next = typeof updater === "function" ? (updater as (old: T) => T)(current) : updater;
      localStorage.setItem(key, JSON.stringify(next));
      emit();
    },
    [key, initial],
  );

  return [value, setValue] as const;
}

type CartContextValue = {
  cart: CartItem[];
  favorites: string[];
  cartCount: number;
  add: (product: Product, portion?: string, addOn?: string) => void;
  update: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  toggleFavorite: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const EMPTY_CART: CartItem[] = [];
const EMPTY_FAVORITES: string[] = [];

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useStored<CartItem[]>("fit-fuel-cart", EMPTY_CART);
  const [favorites, setFavorites] = useStored<string[]>("fit-fuel-favorites", EMPTY_FAVORITES);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      favorites,
      cartCount: cart.reduce((n, item) => n + item.quantity, 0),
      add: (product, portion = "Standard", addOn = "No extras") => {
        setCart((old) => {
          const existing = old.find(
            (item) =>
              item.id === product.id &&
              item.portion === portion &&
              item.addOn === addOn,
          );
          return existing
            ? old.map((item) =>
                item === existing ? { ...item, quantity: item.quantity + 1 } : item,
              )
            : [...old, { ...product, quantity: 1, portion, addOn }];
        });
      },
      update: (id, qty) =>
        setCart((old) =>
          qty <= 0
            ? old.filter((item) => item.id !== id)
            : old.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
        ),
      remove: (id) => setCart((old) => old.filter((item) => item.id !== id)),
      clear: () => setCart([]),
      toggleFavorite: (id) =>
        setFavorites((old) =>
          old.includes(id) ? old.filter((item) => item !== id) : [...old, id],
        ),
    }),
    [cart, favorites, setCart, setFavorites],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
