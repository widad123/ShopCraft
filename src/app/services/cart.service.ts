import {inject, Injectable} from '@angular/core';
import {CartItem} from '../components/cart/CartItem';
import { Database, ref, set, get, remove } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  private db = inject(Database); // ✅ Injection correcte de Firebase Database

  constructor() {
    console.log("🔍 Type de this.db :", this.db); // ✅ Vérifie le type de Firebase Database
    this.loadCartFromFirebase();
  }

  /** Charger le panier depuis Firebase */
  private async loadCartFromFirebase() {
    const dbRef = ref(this.db, 'cart'); // ✅ Correction ref()
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      this.cart = snapshot.val();
      this.cartSubject.next([...this.cart]);
    }
  }

  /** Ajouter un produit au panier */
  addToCart(product: { id: number, name: any; price: any; quantity: number }) {
    console.log("📦 Produit ajouté au panier :", product);
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cart[index].quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.saveCartToFirebase();
  }

  /** Supprimer un produit du panier */
  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCartToFirebase();
  }

  /** Vider complètement le panier */
  clearCart() {
    this.cart = [];
    this.saveCartToFirebase();
  }

  /** Sauvegarder le panier dans Firebase */
  private saveCartToFirebase() {
    console.log("💾 Sauvegarde du panier :", this.cart); // ✅ Vérifie le contenu du panier
    set(ref(this.db, 'cart'), this.cart)
      .then(() => console.log("✅ Panier sauvegardé avec succès"))
      .catch(error => console.error("❌ Erreur de sauvegarde Firebase :", error));

    this.cartSubject.next([...this.cart]); // ✅ Met à jour l'Observable après la sauvegarde
  }


  /** Retourne le panier sous forme d'Observable */
  getCart() {
    return this.cart$;
  }

  /** Calculer le prix total des articles dans le panier */
  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
