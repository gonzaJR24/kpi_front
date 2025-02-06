import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
 
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(e:Event): void {
    e.preventDefault()
    this.authService.login(this.username, this.password).subscribe(response => {
      console.log(response);
      if (response) {
        this.router.navigate(['/empresa']).then(success => {
          if (success) {
            console.log('Navigation successful');
          } else {
            console.error('Navigation failed');
          }
        });
      } else {
        // Maneja el caso en que la respuesta no contenga los datos esperados
        console.error('Respuesta inesperada del servidor', response);
      }
    }, error => {
      console.error('Login failed', error);
    });
  }
}
