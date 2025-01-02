import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado-graph',
  templateUrl: './empleado-graph.component.html',
  styleUrl: './empleado-graph.component.css'
})
export class EmpleadoGraphComponent {
  redirectEmpleadoBar() {
    this.routes.navigate(['empleadoBar'])
  }

  constructor(private routes: Router) { }
  redirectEmpresaBar() {
    this.routes.navigate(['empresaBar'])
  }

  redirectEmpresa() {
    this.routes.navigate(['empresa'])
  }
}
