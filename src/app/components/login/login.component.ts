import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService : AuthService) {
    const user = this.authService.getUser();
    if (user) {
      console.log("🔄 Utilisateur déjà connecté :", user);
      window.location.href = "/home";
    }
  }
  loginWithGoogle(){
     this.authService.loginWithGoogle();
  }
}
