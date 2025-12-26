import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  
  username = signal('');
  password = signal('');
  error = signal('');

  onSubmit() {
    if (this.authService.login(this.username(), this.password())) {
      this.error.set('');
    } else {
      this.error.set('Invalid credentials');
    }
  }
}
