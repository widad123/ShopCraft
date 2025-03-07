import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import {HomeComponent} from './components/home/home.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import {PaymentSuccessComponent} from './components/payment-success/payment-success.component';
import {OrderConfirmationComponent} from './components/order-confirmation/order-confirmation.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {EditProfileComponent} from './pages/edit-profile/edit-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'orderForm' , component: OrderFormComponent},
  { path: 'payment-success' , component: PaymentSuccessComponent},
  { path: 'order-confirmation', component: OrderConfirmationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },

  { path: '**', component: NotFoundComponent },
];
