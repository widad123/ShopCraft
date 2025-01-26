import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { NgForOf, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  imports: [
    CommonModule,
    FormsModule,
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOption: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = [...this.products];
  }

  filterProducts(category: string) {
    this.filteredProducts = category
      ? this.products.filter(p => p.category === category)
      : [...this.products];
  }

  sortProducts(option: string) {
    if (option === 'price') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (option === 'name') {
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
