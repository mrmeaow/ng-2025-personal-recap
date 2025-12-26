import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = signal(false);

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Mock login logic
    if (username && password) {
      this.isAuthenticated.set(true);
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.isAuthenticated();
  }
}
