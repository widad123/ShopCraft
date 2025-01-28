import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { ProductItemComponent } from '../product-item/product-item.component';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  imports: [
    ProductItemComponent,
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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = [...this.products];
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
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
