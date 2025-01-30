import { Component, Input } from '@angular/core';
import {Product} from '../../services/product.service';
import {RouterLink} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  templateUrl: './product-item.component.html',
  imports: [
    RouterLink,
    CommonModule
  ],
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    console.log("🛍️ Produit chargé :", this.product); // ✅ Vérifie si le produit est bien chargé
  }

  addToCart() {
    console.log("🛒 Produit ajouté :", this.product);
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: 1
    });
  }
}
