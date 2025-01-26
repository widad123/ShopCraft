import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../../services/product.service';
import {ProductItemComponent} from '../product-item/product-item.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  imports: [
    ProductItemComponent,
    NgForOf
  ],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
}
