import { Component, OnInit } from '@angular/core';
import {ProductService } from '../../services/product.service';
import {NgClass, NgForOf} from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../Models/Products';
import { CartService } from '../../services/cart.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ThemeService} from '../../services/theme.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  imports: [
    NgForOf,
    RouterLink,
    FormsModule,
    NgClass
  ],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = '';
  selectedSort: string = '';
  categories: string[] = [];
  public darkMode = false;


  constructor(private productService: ProductService, private cartService: CartService, private snackBar: MatSnackBar, private themeService :ThemeService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...this.products];

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
  addToCart(product: Product) {
    this.cartService.addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.image
    });
    this.snackBar.open('Produit ajouté au panier !', 'Fermer', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['custom-snackbar']
    });
  }
  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }

  public isDarkMode(): boolean {
    return this.themeService.getIsDarkMode();
  }
}
