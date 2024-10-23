import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = { username: '', email: '', password1: '', password2: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/login']);  // Redirige al login
      },
      error: (err) => {
        console.error('Error en el registro', err);
      },
    });
  }
}
