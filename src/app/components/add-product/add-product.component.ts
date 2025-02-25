import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Models/Products';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AddProductComponent {
  newProduct: Product = {
    title: '',
    description: '',
    price: 0,
    image: '',
    category: ''

  };


  constructor(private productService: ProductService) {}

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe({
      next: (response) => {
        alert('Produit ajouté avec succès !');
        console.log('Réponse API :', response);
        this.resetForm();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du produit :', err);
      }
    });
  }

  resetForm() {
    this.newProduct = { id: 0, title: '', description: '', price: 0, image: '', category: '' };
  }
}
