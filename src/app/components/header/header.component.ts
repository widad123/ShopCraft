import {Component, ViewChild} from '@angular/core';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {CartComponent} from '../cart/cart.component';
import {MatAnchor, MatButton, MatIconButton} from '@angular/material/button';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

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
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) {}

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
