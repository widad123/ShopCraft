import {Component, OnInit} from '@angular/core';
import {CartItem} from './CartItem';
import {CartService} from '../../services/cart.service';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSmImage,
  MatCardTitle
} from '@angular/material/card';
import {MatButton } from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIcon, MatCardContent, MatCardTitle, MatCard, MatButton, FormsModule, MatCardHeader, MatCardSmImage],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  maxQuantity: number = 10;
  totalItemsCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart;
      this.totalPrice = this.cartService.getTotalPrice();
      this.totalItemsCount = this.cartService.getTotalItemsCount();
    });
  }

  incrementQuantity(id: number) {
    this.cartService.incrementQuantity(id);
    this.totalPrice = this.cartService.getTotalPrice();
  }

  decrementQuantity(id: number) {
    this.cartService.decrementQuantity(id);
    this.totalPrice = this.cartService.getTotalPrice();
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
    this.totalPrice = this.cartService.getTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
    this.totalPrice = 0;
  }

  updateQuantity(id: number, quantity: number): void {
    const newQuantity = quantity;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(id, newQuantity);
      this.totalPrice = this.cartService.getTotalPrice();
    }
  }
}
