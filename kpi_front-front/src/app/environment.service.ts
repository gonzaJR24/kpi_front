// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EnvironmentService {

//   constructor() { }

//   areas:object={
//     urlLocal:"http://localhost:8080/api/area"
//   }

//   empleados:object={
//     urlLocal:"http://localhost:8080/api/empleado"
//   }

//   puntaje:object={
//     urlLocal:"http://localhost:8080/api/puntaje"
//   }

//   criterio:object={
//     urlLocal:"http://localhost:8080/api/criterio",
//     save:"http://localhost:8080/api/criterio/save"
//   }

//   usuarios:object={
//     urlLocal:"http://localhost:8080/api/users"
//   }

//   sucursal:object={
//     urlLocal:"http://localhost:8080/api/sucursal"
//   }

//   tipoUsuario:object={
//     urlLocal:"http://localhost:8080/api/tipoUsuario"
//   }

//   cargo:object={
//     urlLocal:"http://localhost:8080/api/cargo"
//   }


//   area:object={
//     urlLocal:"http://localhost:8080/api/area"
//   }

//   empresa:object={
//     urlLocal:"http://localhost:8080/api/empresa"
//   }
  

// }





import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  areas:object={
    urlLocal:"http://192.168.4.206:8082/api/area"
  }

  empleados:object={
    urlLocal:"http://192.168.4.206:8082/api/empleado"
  }

  puntaje:object={
    urlLocal:"http://192.168.4.206:8082/api/puntaje"
  }

  criterio:object={
    urlLocal:"http://192.168.4.206:8082/api/criterio",
  }

  usuarios:object={
    urlLocal:"http://192.168.4.206:8082/api/users"
  }

  sucursal:object={
    urlLocal:"http://192.168.4.206:8082/api/sucursal"
  }

  tipoUsuario:object={
    urlLocal:"http://192.168.4.206:8082/api/tipoUsuario"
  }

  cargo:object={
    urlLocal:"http://192.168.4.206:8082/api/cargo"
  }


  area:object={
    urlLocal:"http://192.168.4.206:8082/api/area"
  }

empresa:object={
  urlLocal:"http://192.168.4.206:8082/api/empresa"
}

}
