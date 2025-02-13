import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imgUrl: string = "https://github.com/gonzaJR24/HTML-CSS/blob/main/menu/Logo-fondo-blanco.png?raw=true";
  userName: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadUserName();
  }

  redirectEmpresa() {
    this.router.navigate(["empresa"]);
  }

  redirectArea() {
    this.router.navigate(["area"]);
  }

  redirectEmpleado() {
    this.router.navigate(["empleado"]);
  }

  redirectPuntaje() {
    this.router.navigate(["puntaje"]);
  }

  redirectCriterio() {
    this.router.navigate(["criterio"]);
  }

  redirectUsuario() {
    this.router.navigate(["usuario"]);
  }

  redirectEvaluar() {
    this.router.navigate(["evaluar"]);
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
    sessionStorage.clear()
    this.router.navigate(['']);
    
  }
}
