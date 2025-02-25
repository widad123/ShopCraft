import {ViewChild, ElementRef, AfterViewInit, NgZone, Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-order-form',
  standalone: true,
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatIcon,
    MatProgressBar,
  ]
})

export class OrderFormComponent {
  personalInfoForm!: FormGroup;
  addressForm!: FormGroup;
  paymentForm!: FormGroup;
  progress = 0;

  pointsRelais = [
    { id: 1, name: 'Relais 1', address: '10 rue des Lilas, Paris' },
    { id: 2, name: 'Relais 2', address: '5 avenue des Champs, Paris' },
    { id: 3, name: 'Relais 3', address: '15 rue de la Paix, Paris' }
  ];

  constructor(private fb: FormBuilder, private ngZone: NgZone, private router: Router) {
    this.createForms();
    this.handleFormChanges();
  }

  createForms() {
    this.personalInfoForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(?:\+33|0)[67]\d{8}$/)]]
    });

    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      deliveryMethod: ['standard', Validators.required],
      selectedRelay: [null],
      deliveryInstructions: ['']
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/)]],
      expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });
  }

  handleFormChanges() {
    this.addressForm.get('deliveryMethod')?.valueChanges.subscribe(value => {
      if (value === 'pickup') {
        this.disableAddressFields();
      } else {
        this.enableAddressFields();
      }
    });

    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(value => {
      if (value === 'cash') {
        this.disableCardFields();
      } else {
        this.enableCardFields();
      }
    });

    this.personalInfoForm.valueChanges.subscribe(() => this.updateProgress());
  }

  disableAddressFields() {
    ['address', 'city', 'zipCode'].forEach(field => {
      this.addressForm.get(field)?.clearValidators();
      this.addressForm.get(field)?.setValue('');
      this.addressForm.get(field)?.disable();
    });
    this.addressForm.get('selectedRelay')?.setValidators(Validators.required);
    this.addressForm.updateValueAndValidity();
  }

  enableAddressFields() {
    ['address', 'city', 'zipCode'].forEach(field => {
      this.addressForm.get(field)?.setValidators(Validators.required);
      this.addressForm.get(field)?.enable();
    });
    this.addressForm.get('selectedRelay')?.clearValidators();
    this.addressForm.updateValueAndValidity();
  }

  disableCardFields() {
    ['cardName', 'cardNumber', 'expirationDate', 'cvv'].forEach(field => {
      this.paymentForm.get(field)?.clearValidators();
      this.paymentForm.get(field)?.setValue('');
      this.paymentForm.get(field)?.disable();
    });
    this.paymentForm.updateValueAndValidity();
  }

  enableCardFields() {
    this.paymentForm.get('cardName')?.setValidators([Validators.required]);
    this.paymentForm.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/)]);
    this.paymentForm.get('expirationDate')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
    this.paymentForm.get('cvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3,4}$/)]);
    this.paymentForm.updateValueAndValidity();
  }

  updateProgress() {
    const controls = this.personalInfoForm.controls;
    const validFields = Object.keys(controls).filter(key => controls[key].valid).length;
    const totalFields = Object.keys(controls).length;
    this.progress = (validFields / totalFields) * 100;
  }

  formatExpirationDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    event.target.value = value;
    this.paymentForm.get('expirationDate')?.setValue(value, { emitEvent: false });
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    event.target.value = value;
    this.paymentForm.get('cardNumber')?.setValue(value, { emitEvent: false });
  }

  formatCVV(event: any) {
    let value = event.target.value.replace(/\D/g, '').substring(0, 4);
    event.target.value = value;
    this.paymentForm.get('cvv')?.setValue(value, { emitEvent: false });
  }

  isFieldValid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control?.valid && control?.touched);
  }

  isFieldInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  submitOrder() {
    if (this.paymentForm.valid) {
      console.log("Commande soumise avec succès !");
      this.router.navigate(['/payment-success']);
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }
}


