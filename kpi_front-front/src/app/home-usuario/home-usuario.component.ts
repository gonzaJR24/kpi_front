import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrl: './home-usuario.component.css'
})
export class HomeUsuarioComponent {
 imgUrl: string = "https://github.com/gonzaJR24/HTML-CSS/blob/main/menu/Logo-fondo-blanco.png?raw=true";
  userName: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Initial load of the username
    this.loadUserName();

    // Update the username whenever navigation occurs
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadUserName();
      });
  }

  redirectEmpresa() {
    this.router.navigate(["empresaUsuario"]);
  }

  redirectEmpleado() {
    this.router.navigate(["empleadoUsuario"]);
  }

  redirectPuntaje() {
    this.router.navigate(["puntajeUsuario"]);
  }


  redirectLogin() {
    this.router.navigate([""]);
  }

  redirectEvaluar() {
    this.router.navigate(["evaluarUsuario"]);
  }

// HomeComponent
loadUserName() {
  const storedUserName = sessionStorage.getItem('userName');
  if (storedUserName) {
    this.userName = storedUserName;
  } 
}


  logout() {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userName');
    this.router.navigate(['']);
  }
}
