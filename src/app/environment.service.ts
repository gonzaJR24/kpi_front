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
    urlLocal:"http://localhost:8080/api/criterio",
    save:"http://localhost:8080/api/criterio/save"
  }

  usuarios:object={
    urlLocal:"http://localhost:8080/api/usuario"
  }

  sucursal:object={
    urlLocal:"http://localhost:8080/api/sucursal"
  }

  tipoUsuario:object={
    urlLocal:"http://localhost:8080/api/tipo_usuario"
  }

  cargo:object={
    urlLocal:"http://localhost:8080/api/cargo"
  }

  sexo:object={
    urlLocal:"http://localhost:8080/api/sexo"
  }

  area:object={
    urlLocal:"http://localhost:8080/api/area"
  }

}
