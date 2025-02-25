import {Component, OnInit} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {CartComponent} from '../cart/cart.component';
import {MatAnchor, MatButton, MatIconButton} from '@angular/material/button';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { CartService } from '../../services/cart.service';
import {NgIf} from '@angular/common';
import {SearchComponent} from '../search/search.component';
import {AuthService} from '../../services/auth.service';


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
    MatMenuItem,
    SearchComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  cartCount: number = 0;
  userProfilePicture: string = 'assets/profile.png';
  userName: string ="Invité";
  userEmail: string|undefined;
  constructor(private router: Router, private cartService : CartService, private authService :AuthService) {
    const user = this.authService.getUser();
    if (user) {
      console.log("🔄 Utilisateur déjà connecté :", user);
      this.loadUserData();

    }
  }


  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }

  toggleUserMenu(event: Event) {
    const trigger = event.target as HTMLElement;
    trigger.click();
  }

  goToCart(){
    this.router.navigate(['/cart']);
  }

  loadUserData() {
    const userData = localStorage.getItem("user");

    if (userData) {
      const user = JSON.parse(userData);
      this.userProfilePicture = user.picture || "assets/profile.png";
      console.log("photo: ", user.picture);
      this.userName = user.name || "Utilisateur";
      this.userEmail = user.email || "Email non disponible";
    } else {
      console.warn("Aucun utilisateur connecté.");
    }
  }

  goToProfile() {
    console.log("Redirection vers le profil...");
    this.router.navigate(["/profile"]);
  }


  logout() {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.getUser() !== null;
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
    this.router.navigate(['/home']);
  }

}


