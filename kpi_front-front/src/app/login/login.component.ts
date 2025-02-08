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
      sessionStorage.setItem("lider",response.username.nombres+" "+response.username.apellidos);
      sessionStorage.setItem("area",response.username.area);
      if (response.username.tipoUsuario.tipoUsuario=="admin") {
        this.router.navigate(['/empresa'])
      } 
      if(response.username.tipoUsuario.tipoUsuario=="user"){
        this.router.navigate(['/empresaUsuario'])
      }
    }, error => {
      alert("Usuario o Contrasena Incorrectos")
    });
  }
}
