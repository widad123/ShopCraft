import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../components/cart/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
    this.cart = JSON.parse(storedCart);
    this.cartSubject.next([...this.cart]);
    }
  }

  addToCart(product: CartItem) {
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cart[index].quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next([...this.cart]);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  incrementQuantity(productId: number) {
    const index = this.cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      this.cart[index].quantity++;
      this.cartSubject.next([...this.cart]);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  decrementQuantity(productId: number) {
    const index = this.cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      } else {
        this.cart.splice(index, 1);
      }
      this.cartSubject.next([...this.cart]);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.cartSubject.next([...this.cart]);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next([...this.cart]);
    localStorage.removeItem('cart');
  }

  getCart() {
    return this.cart$;
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  updateQuantity(productId: number, quantity: number) {
    const index = this.cart.findIndex(item => item.id === productId);
    if (index !== -1 && quantity > 0) {
      this.cart[index].quantity = quantity;
      this.cartSubject.next([...this.cart]);
    }
  }

  getTotalItemsCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

}
