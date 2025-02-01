import {Component, OnInit} from '@angular/core';
import {CartItem} from './CartItem';
import {CartService} from '../../services/cart.service';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatButton, MatIconButton, MatMiniFabButton} from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIcon, MatCardContent, MatCardTitle, MatCard, MatMiniFabButton, MatIconButton, MatButton],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart;
    });
    this.totalPrice = this.cartService.getTotalPrice();
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
}
