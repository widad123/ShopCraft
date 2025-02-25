import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-profile-updated-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Modification réussie</h2>
    <mat-dialog-content>Votre profil a été mis à jour avec succès !</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>OK</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      h2 {
        color: #4caf50;
      }
      mat-dialog-content {
        font-size: 16px;
      }
      mat-dialog-actions {
        margin-top: 10px;
      }
    `
  ],
  imports: [MatDialogModule, MatButtonModule],
})
export class ProfileUpdatedDialog {}
