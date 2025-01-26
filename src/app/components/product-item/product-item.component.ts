import { Component, Input } from '@angular/core';
import {Product} from '../../services/product.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  templateUrl: './product-item.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;
}
