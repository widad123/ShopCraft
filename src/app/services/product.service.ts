import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Parfum Prada',
      description: 'prada paradoxe parfume',
      price: 100,
      imageUrl: 'assets/parfum-prada.jpg',
      category: 'Catégorie 1'
    },
    {
      id: 2,
      name: 'Parfum Georgio Armani',
      description: 'parfum de la marque',
      price: 150,
      imageUrl: 'assets/parfum-ga.jpg',
      category: 'Catégorie 2'
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product {
    console.log("🔍 Recherche du produit ID :", id);
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new Error(`❌ Produit avec ID ${id} non trouvé !`);
    }
    return product;
  }


}
