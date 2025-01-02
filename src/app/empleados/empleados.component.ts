import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit{
  empleados:any;
  data:any;
  cargos:any
  area:any
  constructor(private http:HttpClient, private env:EnvironmentService, private routes:Router){}

  ngOnInit(): void {
    const url=(this.env.empleados as any).urlLocal;
    this.http.get(url).subscribe(response=>{
      this.empleados=response;
    })
  }
  

  EditEmpleadoAlert(e: Event, id: number) {
    e.preventDefault();
  
    let objEmpleado: any;
    const urlEmpleado = (this.env.empleados as any).urlLocal;
    const urlSucursal = (this.env.sucursal as any).urlLocal;
    const urlCargo = (this.env.cargo as any).urlLocal;
    const urlArea = (this.env.area as any).urlLocal;
  
    this.http.get(urlEmpleado + "/" + id).subscribe((empleadoResponse: any) => {
      objEmpleado = empleadoResponse; 
      })

      this.http.get(urlArea).subscribe(response=>{
        this.area=response
      })

      let areasHtml: string = '';
        this.area.forEach((item: any) => {
          if (item != null) {
            areasHtml += `<option value="${item.id}">${item.nombreArea}</option>`;
          }
        });

      this.http.get(urlCargo).subscribe(response=>{
        this.cargos=response;

        let cargosHTML: string = '';
        this.cargos.forEach((item: any) => {
          if (item != null) {
            cargosHTML += `<option value="${item.id}">${item.nombreCargo}</option>`;
          }
        });

        

  
      this.http.get(urlSucursal).subscribe((sucursalResponse: any) => {
        this.data = sucursalResponse; 
  
        let optionsHtml: string = '';
        this.data.forEach((item: any) => {
          if (item != null) {
            optionsHtml += `<option value="${item.id}">${item.nombreSucursal}</option>`;
          }
        });
  
        Swal.fire({
          title: 'Editar Empleado',
          showConfirmButton: false,
          html: `
            <form id="editEmpleadoForm">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" value="${objEmpleado.nombre}">
              </div>
              
              <div class="mb-3">
                <label for="apellido" class="form-label">Apellido</label>
                <input type="text" class="form-control" id="apellido" name="apellido" value="${objEmpleado.apellido}">
              </div>
  
              <label for="area" class="form-label">Area</label>
              <select class="form-select form-select-sm mb-3" id="area" name="area">
                  ${areasHtml}
              </select>
  
              <label for="cargo" class="form-label">Cargo</label>
              <select class="form-select form-select-sm mb-3" id="cargo" name="cargo">
                  ${cargosHTML}
              </select>
  
              <button type="submit" class="btn btn-primary" id="btn">Enviar</button>
            </form>
          `,
          focusConfirm: false,
        }).then(() => {});
  
        // Handle form submission
        const form = document.getElementById('editEmpleadoForm') as HTMLFormElement;
  
        form?.addEventListener('submit', (submitEvent) => {
          submitEvent.preventDefault();
  
          const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
          const apellido = (document.getElementById('apellido') as HTMLInputElement).value;
          const area = (document.getElementById('area') as HTMLInputElement).value;
          const cargo = (document.getElementById('cargo') as HTMLInputElement).value;
  
          const url = (this.env.empleados as any).urlLocal;
  
          if (nombre !== '' && apellido !== '') {
            this.http.put(url+"/"+id, { nombre, apellido, area, cargo }).subscribe({
              next: () => {
                Swal.fire(`Usuario editado`, 'success');
                setTimeout(() => {
                  this.ngOnInit();
                }, 1000);
              },
              error: (err) => {
                console.error('Error editing user:', err);
                Swal.fire('Error', 'No se pudo editar el usuario', 'error');
              }
            });
          } else {
            Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
          }
        });
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
          error: () => {
            Swal.fire(`Empleado eliminado`, 'success');
            this.routes.navigate(["empleado"]); // Revisar actualizacion al borrar
          }
        });

      }
    });
  }

}
