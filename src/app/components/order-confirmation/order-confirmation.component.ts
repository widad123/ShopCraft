import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-order-confirmation',
  imports: [
    MatCard,
    MatIcon
  ],
  templateUrl: './order-confirmation.component.html',
  standalone: true,
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent {

}
