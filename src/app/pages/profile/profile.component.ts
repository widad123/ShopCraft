import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    MatButton
  ],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfilePicture: string = 'assets/default-avatar.png';
  userName: string = 'Utilisateur';
  userEmail: string = '';
  userPhone: string = '';
  userAddress: string = '';


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);
      this.userProfilePicture = user.picture || 'assets/default-avatar.png';
      this.userName = user.name || 'Utilisateur';
      this.userEmail = user.email || '';
      this.userPhone = user.phone || '';
      this.userAddress = user.address || '';
    }
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
