import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private clientId ='651532476254-5jhho4a5pu336asn11top7bi4k6hlobp.apps.googleusercontent.com';
  constructor(private router: Router) {
    setTimeout(() => {
      this.loadGoogleAuth();
    }, 500);
  }
  private loadGoogleAuth() {
    if (!(window as any).google) {
      setTimeout(() => this.loadGoogleAuth(), 1000);
      return;
    }
    (window as any).google.accounts.id.initialize({
      client_id: this.clientId,
      callback: (response: any) => {
        this.handleCredentialResponse(response);
      },
    });
  }



  loginWithGoogle() {
    console.log("Bouton Google cliqué");
    (window as any).google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        (window as any).google.accounts.id.prompt({ force: true });
      }
    });
  }



  private handleCredentialResponse(response: any) {
    const token = response.credential;
    const user = this.decodeJwt(token);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/home']);
  }

  private decodeJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }



}
