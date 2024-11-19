import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  areas:object={
    urlLocal:"http://localhost:8080/api/area"
  }

  empleados:object={
    urlLocal:"http://localhost:8080/api/empleado"
  }

  puntaje:object={
    urlLocal:"http://localhost:8080/api/puntaje"
  }

  criterio:object={
    urlLocal:"http://localhost:8080/api/criterio"
  }

  usuarios:object={
    urlLocal:"http://localhost:8080/api/usuario"
  }

  sucursal:object={
    urlLocal:"http://localhost:8080/api/sucursal"
  }
}
