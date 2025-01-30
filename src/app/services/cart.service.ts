import { Injectable, inject, NgZone } from '@angular/core';
import { Database, ref, set, get, remove, onValue } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../components/cart/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private db: Database = inject(Database);
  private ngZone = inject(NgZone);
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    console.log("🔍 Type de this.db :", this.db);
    this.syncCartWithFirebase();
  }

  private syncCartWithFirebase() {
    const dbRef = ref(this.db, 'cart');
    onValue(dbRef, (snapshot) => {
      this.ngZone.run(() => {
        if (snapshot.exists()) {
          this.cart = snapshot.val() || [];
          console.log("🛒 Mise à jour Firebase :", this.cart);
          this.cartSubject.next([...this.cart]);
        } else {
          console.log("🛍️ Firebase renvoie un panier vide.");
          this.cart = [];
          this.cartSubject.next([]);
        }
      });
    }, (error) => {
      console.error("❌ Erreur de synchronisation Firebase :", error);
    });
  }

  addToCart(product: CartItem) {
    console.log("📦 Produit ajouté au panier :", product);
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cart[index].quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.saveCartToFirebase();
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCartToFirebase();
  }

  clearCart() {
    this.cart = [];
    this.saveCartToFirebase();
  }

  private saveCartToFirebase() {
    console.log("💾 Sauvegarde du panier :", this.cart);
    set(ref(this.db, 'cart'), this.cart)
      .then(() => console.log("✅ Panier sauvegardé avec succès"))
      .catch(error => console.error("❌ Erreur de sauvegarde Firebase :", error));

    this.cartSubject.next([...this.cart]);
  }

  getCart() {
    return this.cart$;
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
