import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../components/cart/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();
  cartCount$ = this.cartCount.asObservable();

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
    this.cart = JSON.parse(storedCart);
    this.cartSubject.next([...this.cart]);
    }
  }

    addToCart(product: { id: number | undefined; name: string; price: number; quantity: number; imageUrl: string }) {
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cart[index].quantity += 1;
    } else {
      this.cart.push(<CartItem>{...product, quantity: 1});
      this.cartCount.next(this.cart.length);
      this.updateCartCount();

    }
    this.cartSubject.next([...this.cart]);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  incrementQuantity(productId: number) {
    const index = this.cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      this.cart[index].quantity++;
      this.cartSubject.next([...this.cart]);
      this.updateCartCount();
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
      this.updateCartCount();
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.cartSubject.next([...this.cart]);
    this.updateCartCount();
    localStorage.setItem('cart', JSON.stringify(this.cart));

  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next([...this.cart]);
    this.updateCartCount();
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
  private updateCartCount() {
    this.cartCount.next(this.getTotalItemsCount());
    this.cartSubject.next([...this.cart]);
  }

}
