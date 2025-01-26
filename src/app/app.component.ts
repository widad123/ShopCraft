import {Component, inject} from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-ecommerce-app';

  constructor() {

  }
}
