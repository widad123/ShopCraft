import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, Observable, of, switchMap} from 'rxjs';
import {Product} from '../../Models/Products';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  filteredProducts$: Observable<Product[]> = of([]);

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.filteredProducts$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value || value.trim().length === 0) {
          return of([]);
        }
        return this.productService.getProducts().pipe(
          map(products =>
            products.filter(product =>
              product.title.toLowerCase().includes(value.toLowerCase())
            )
          )
        );
      })
    );
  }

  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
