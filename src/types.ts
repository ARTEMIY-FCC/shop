export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isInCart: (productId: number) => boolean;
  getItemQuantity: (productId: number) => number;
  clearCart: () => void;
};