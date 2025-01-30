import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

// Generate 2000 blank products
const generateBlankProducts = (): Product[] => {
  return Array.from({ length: 2000 }, (_, index) => ({
    id: `blank-${index + 1}`,
    name: `Product ${index + 1}`,
    description: 'Click edit to add description',
    details: ['Add product details'],
    currentPrice: 0,
    previousPrice: undefined,
    images: ['https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=800&q=75&fm=webp'],
    category: 'Uncategorized',
    externalLink: 'https://example.com',
    createdAt: new Date()
  }));
};

// Initial products data
const initialProducts: Product[] = generateBlankProducts();

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage or use initial products
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}