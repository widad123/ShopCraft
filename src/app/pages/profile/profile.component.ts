import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user:any=null;
  constructor(private authService : AuthService) {
  }
  ngOnInit() {
    this.user = this.authService.getUser();
  }
  logout(){
    this.authService.logout();
    window.location.href = '/login';
  }
}
