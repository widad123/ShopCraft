import { Component } from '@angular/core';
import {CartItem} from './CartItem';
import {CartService} from '../../services/cart.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: CartItem[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart;
      console.log("🛒 Panier reçu dans CartComponent :", this.cartItems);
    });
    this.totalPrice = this.cartService.getTotalPrice();
  }


  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
