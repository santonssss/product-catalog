import { makeAutoObservable, action } from "mobx";
import { Product } from "./ProductStore";

interface CartItem {
  product: Product;
  quantity: number;
}

class CartStore {
  items: CartItem[] = [];
  isCartOpen: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      addToCart: action,
      removeFromCart: action,
      updateQuantity: action,
      toggleCart: action,
      closeCart: action,
      openCart: action,
      clearCart: action,
    });
    this.loadFromLocalStorage();
  }

  addToCart(product: Product) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }

    this.saveToLocalStorage();
  }

  removeFromCart(productId: string) {
    const index = this.items.findIndex((item) => item.product.id === productId);

    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  updateQuantity(productId: string, quantity: number) {
    const item = this.items.find((item) => item.product.id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveToLocalStorage();
      }
    }
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  closeCart() {
    this.isCartOpen = false;
  }

  openCart() {
    this.isCartOpen = true;
  }

  clearCart() {
    this.items = [];
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    try {
      const serializedCart = JSON.stringify(this.items);
      localStorage.setItem("cart", serializedCart);
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }

  private loadFromLocalStorage() {
    try {
      const serializedCart = localStorage.getItem("cart");
      if (serializedCart) {
        this.items = JSON.parse(serializedCart);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }

  get totalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}

export default new CartStore();
