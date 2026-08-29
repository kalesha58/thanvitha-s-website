"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Product } from "@/lib/types";

type ProductActions = {
  add: (product: Product, portion?: string, addOn?: string) => void;
};

const ProductActionsContext = createContext<ProductActions>({
  add: () => undefined,
});

export function ProductActionsProvider({
  value,
  children,
}: {
  value: ProductActions;
  children: ReactNode;
}) {
  return (
    <ProductActionsContext.Provider value={value}>
      {children}
    </ProductActionsContext.Provider>
  );
}

export function useProductActions() {
  return useContext(ProductActionsContext);
}
