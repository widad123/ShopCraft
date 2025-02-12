import {Component, OnInit} from '@angular/core';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {CartComponent} from '../cart/cart.component';
import {MatAnchor, MatButton, MatIconButton} from '@angular/material/button';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { CartService } from '../../services/cart.service';
import {NgIf} from '@angular/common';
import {MatCardAvatar} from '@angular/material/card';
import {SearchComponent} from '../search/search.component';


@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIcon,
    MatMenu,
    CartComponent,
    MatMenuTrigger,
    MatIconButton,
    MatButton,
    RouterLink,
    MatAnchor,
    RouterLinkActive,
    NgIf,
    SearchComponent
    NgIf,
    MatCardAvatar,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private router: Router, private cartService : CartService) {}
  cartCount: number = 0;


  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
  goToCart() {
    this.router.navigate(['/cart']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
