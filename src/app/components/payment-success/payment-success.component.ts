import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-payment-success',
  imports: [
    MatCard,
    MatIcon
  ],
  templateUrl: './payment-success.component.html',
  standalone: true,
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {

}
