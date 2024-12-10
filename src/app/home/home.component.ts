import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imgUrl:string="https://github.com/gonzaJR24/HTML-CSS/blob/main/menu/Logo-fondo-blanco.png?raw=true";

  constructor(private routes:Router){}

  redirectEmpresa(){
    this.routes.navigate(["empresa"]);
  }

  redirectArea(){
    this.routes.navigate(["area"]);
  }

  
  redirectEmpleado(){
    this.routes.navigate(["empleado"]);
  }

  redirectPuntaje(){
    this.routes.navigate(["puntaje"]);
  }

  redirectCriterio(){
    this.routes.navigate(["criterio"]);
  }
  
  redirectUsuario(){
    this.routes.navigate(["usuario"]);
  }

  redirectLogin(){
    this.routes.navigate(["login"]);
  }

  redirectEvaluar(){
    this.routes.navigate(["evaluar"]);
  }

}
