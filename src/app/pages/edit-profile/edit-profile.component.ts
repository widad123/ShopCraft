import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {
  ProfileUpdatedDialog
} from '../../components/profile-updated-dialog.component.ts/profile-updated-dialog.component.ts.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  templateUrl: './edit-profile.component.html',
  imports: [
    MatFormField, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  styleUrls: ['./edit-profile.component.scss'],

})
export class EditProfileComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  userAddress: string = '';

  originalUserData: any = {};

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.name;
      this.userEmail = user.email;
      this.userPhone = user.phone || '';
      this.userAddress = user.address || '';
      this.loadUserData();

      this.originalUserData = { ...user };

    }
  }

  loadUserData() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.name || '';
      this.userEmail = user.email || '';
      this.userPhone = user.phone || '';
      this.userAddress = user.address || '';
    }
  }

  saveChanges() {
    const updatedUser = {
      name: this.userName,
      email: this.userEmail,
      phone: this.userPhone,
      address: this.userAddress,
      picture: JSON.parse(localStorage.getItem('user') || '{}').picture
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));

    this.dialog.open(ProfileUpdatedDialog).afterClosed().subscribe(() => {
      this.router.navigate(['/profile']);
    });  }

  cancel() {
    this.router.navigate(['/profile']);
  }

  isModified(): boolean {
    return (
      this.userName !== this.originalUserData.name ||
      this.userEmail !== this.originalUserData.email ||
      this.userPhone !== this.originalUserData.phone ||
      this.userAddress !== this.originalUserData.address
    );
  }

}

