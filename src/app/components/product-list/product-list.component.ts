import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  imports: [
    NgForOf,
    RouterLink,
    FormsModule
  ],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = '';
  selectedSort: string = '';
  categories: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...this.products];

      // 🔹 Extraire les catégories uniques sans les dupliquer
      this.categories = [...new Set(this.products.map(p => p.category))];
    });
  }

  filterProducts() {
    this.filteredProducts = this.selectedCategory
      ? this.products.filter(p => p.category === this.selectedCategory)
      : [...this.products];
  }

  sortProducts() {
    if (this.selectedSort === 'price') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'name') {
      this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    }
  }
}
