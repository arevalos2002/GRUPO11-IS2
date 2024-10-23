// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  error: string | null = null;  // Añade la propiedad 'error' para manejar errores

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access_token);
        this.router.navigate(['/dashboard']);  // Redirige al dashboard u otra ruta
        this.error = null;  // Limpiar cualquier error previo si el login es exitoso
      },
      error: (err) => {
        console.error('Login error', err);
        this.error = 'Login fallido. Verifica tus credenciales.';  // Asigna un mensaje de error
      },
    });
  }
}
