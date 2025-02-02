import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Product, ProductService} from '../../services/product.service';
import {CommonModule} from '@angular/common';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);
  }


  addToCart() {
    if (this.product && this.product.id !== undefined) {
      this.cartService.addToCart({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: 1,
        imageUrl : this.product.imageUrl
      });
    } else {
      console.error("Erreur : le produit est invalide ou n'a pas d'ID !");
    }
  }

}
