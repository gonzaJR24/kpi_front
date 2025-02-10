import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-empleado-user',
  templateUrl: './empleado-user.component.html',
  styleUrl: './empleado-user.component.css'
})
export class EmpleadoUserComponent {
 empleados:any;
  data:any;
  cargos:any
  area:any
  constructor(private http:HttpClient, private env:EnvironmentService, private routes:Router){}

  ngOnInit(): void {
    const url="http://192.168.4.206:8082/api/empleado/findByArea"
    let area=sessionStorage.getItem("area");
    this.http.post(url,{area}).subscribe(response=>{
      this.empleados=response;
    })
  }
  

  EditEmpleadoAlert(e: Event, id: number) {
    e.preventDefault();
  
    const urlEmpleado = (this.env.empleados as any).urlLocal + "/" + id;
    const urlCargo = (this.env.cargo as any).urlLocal;
    const urlArea = (this.env.area as any).urlLocal;
  
    // Fetch all required data concurrently
    forkJoin({
      empleado: this.http.get(urlEmpleado),
      cargos: this.http.get(urlCargo),
      areas: this.http.get(urlArea)
    }).subscribe(({ empleado, cargos, areas }) => {
      const empleadoData = empleado as any;
      const cargosData = cargos as any[];
      const areasData = areas as any[];
  
      let areasHtml = areasData.map(area => `<option value="${area.id}">${area.nombreArea}</option>`).join('');
      let cargosHtml = cargosData.map(cargo => `<option value="${cargo.id}">${cargo.nombreCargo}</option>`).join('');
  
      Swal.fire({
        title: 'Editar Empleado',
        showConfirmButton: false,
        html: `
          <form id="editEmpleadoForm">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="nombre" value="${empleadoData.nombre}">
            </div>
            <div class="mb-3">
              <label for="apellido" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="apellido" value="${empleadoData.apellido}">
            </div>
            <label for="area" class="form-label">Area</label>
            <select class="form-select mb-3" id="area">
              ${areasHtml}
            </select>
            <label for="cargo" class="form-label">Cargo</label>
            <select class="form-select mb-3" id="cargo">
              ${cargosHtml}
            </select>
            <button type="submit" class="btn btn-primary">Enviar</button>
          </form>
        `
      });
  
      const form = document.getElementById('editEmpleadoForm') as HTMLFormElement;
      form?.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
  
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        const apellido = (document.getElementById('apellido') as HTMLInputElement).value;
        const area = (document.getElementById('area') as HTMLSelectElement).value;
        const cargo = (document.getElementById('cargo') as HTMLSelectElement).value;
  
        if (nombre && apellido && area && cargo) {
          let url=(this.env.empleados as any).urlLocal;
          this.http.put(url + "/" + id, { nombre, apellido, area, cargo }).subscribe({
            next: () => {
              Swal.fire('Empleado editado', '', 'success');
              this.ngOnInit();
            },
            error: () => Swal.fire('Error', 'No se pudo editar el usuario', 'error')
          });
        } else {
          Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
        }
      });
    });
  }
  

  AddEmpleadoAlert(e: Event) {
    e.preventDefault();
    const urlArea=(this.env.area as any).urlLocal;
    const urlCargo=(this.env.cargo as any).urlLocal;

    this.http.get(urlArea).subscribe(response=>{
      this.area=response;
    });

    this.http.get(urlCargo).subscribe(response=>{
      this.cargos=response;
    });

    let areaHtml!:string;
    let cargoHtml!:string;

    this.area.forEach((item: any) => {
      if(item!=null){
        areaHtml += `<option value="${item.id}">${item.nombreArea}</option>`;
      }
    });


    this.cargos.forEach((item: any) => {
      if(item!=null){
        cargoHtml += `<option value="${item.id}">${item.nombreCargo}</option>`;
      }
    });

    
    Swal.fire({
      title: 'Agregar Empleado',
      showConfirmButton: false,
      html: `
        <form id="addEmpleadoForm">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" name='nombre'>
          </div

          <div class="mb-3">
            <label for="apellido" class="form-label">Apellido</label>
            <input type="text" class="form-control" id="apellido" name='apellido'>
          </div>

          <label for="area" class="form-label">Area</label>
            <select class="form-select form-select-sm mb-3" id="area" name="area">
                <option selected>--seleccione--</option>
                ${areaHtml}
            </select>

            <label for="cargo" class="form-label">Cargo</label>
            <select class="form-select form-select-sm mb-3" id="cargo" name="cargo">
                <option selected>--seleccione--</option>
                ${cargoHtml}
            </select>
        
          <button type="submit" class="btn btn-primary" id='btn'>Enviar</button>
        </form>
      `,
      focusConfirm: false,
    }).then(() => {

    });

    const form = document.getElementById('addEmpleadoForm') as HTMLFormElement;

    form?.addEventListener('submit', (submitEvent) => {
      submitEvent.preventDefault();

      const nombre = (document.getElementById('nombre') as HTMLSelectElement).value;
      const apellido = (document.getElementById('apellido') as HTMLInputElement).value;
      const area = (document.getElementById('area') as HTMLSelectElement).value;
      const cargo= (document.getElementById('cargo') as HTMLSelectElement).value;

      const url = (this.env.empleados as any).urlLocal;

      if (nombre !== '' && apellido !== '' && area !== '' && cargo !== '') {

        this.http.post(url, { nombre, apellido, cargo, area }).subscribe({
          next: () => {
            Swal.fire(`Empleado agregado`, `El cargo es ${cargo}`, 'success');
            setTimeout(() => {
              this.ngOnInit();
            }, 1000);
          },
          error: (err) => {
            console.error('Error adding user:', err);
            Swal.fire('Error', 'No se pudo agregar el usuario', 'error');
          }
        });
      } else {
        Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
      }
    });
  }

  showDeleteAlert(e: Event, id: number) {
    e.preventDefault()
    const url = (this.env.empleados as any).urlLocal + "/" + id
    Swal.fire({
      title: "Esta seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "red",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si,eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(url).subscribe({
          next: () => {
            Swal.fire(`Empleado eliminado`, 'success');
            setTimeout(() => {
              this.ngOnInit();
            }, 1000);
            this.routes.navigate(["empleado"]); // Revisar actualizacion al borrar
          }
        });

      }
    });
  }

}
