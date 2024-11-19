import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrl: './area.component.css'
})
export class AreaComponent implements OnInit{
  areaResponse:any;
  data:any;
  constructor(private http:HttpClient, private env:EnvironmentService){}

  ngOnInit(): void {
    const url=(this.env.areas as any).urlLocal;
    this.http.get(url).subscribe(response=>{
      this.areaResponse=response;
    })
  }

   EditAreaAlert(e: Event) {
    const url=(this.env.sucursal as any).urlLocal;
    this.http.get(url).subscribe(response=>{
      this.data=response;
    });
    
    let optionsHtml!:string;
    this.data.forEach((item: any) => {
      if(item!=null){
        optionsHtml += `<option value="${item.id}">${item.nombreSucursal}</option>`;
      }
    });

    e.preventDefault();
    Swal.fire({
      title: 'Editar Area',
      showConfirmButton: false,
      html: `
        <form id="editAreaForm">

          <div class="mb-3">
            <label for="area" class="form-label">Area</label>
            <input type="text" class="form-control" id="area" name='area'>
          </div

          <div class="mb-3">
            <label for="cantidadEmpleados" class="form-label">Cantidad Empleados</label>
            <input type="number" class="form-control" id="cantidadEmpleados" name='cantidadEmpleados'>
          </div>

          <div class="mb-3">
            <label for="puntajeTotal" class="form-label">Puntaje Total</label>
            <input type="number" class="form-control" id="puntajeTotal" name='puntajeTotal'>
          </div>

           <div class="mb-3">
            <label for="rendimientoArea" class="form-label">Rendimiento Area</label>
            <input type="number" class="form-control" id="rendimientoArea" name='rendimientoArea'>
          </div>

          <div class="mb-3">
            <label for="sucursal" class="form-label">Sucursal</label>
            <input type="text" class="form-control" id="sucursal" name='sucursal'>
          </div
        
          <div>
          <button type="submit" class="btn btn-primary" id='btn'>Enviar</button>
          </div>
        </form>
      `,
      focusConfirm: false,
    }).then(() => {

    });

    const form = document.getElementById('editAreaForm') as HTMLFormElement;

    form?.addEventListener('submit', (submitEvent) => {
      submitEvent.preventDefault();

      const userSelect = (document.getElementById('userSelect') as HTMLSelectElement).value;
      const username = (document.getElementById('username') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
      const role = (document.getElementById('role') as HTMLSelectElement).value;

      const url = (this.env.usuarios as any).urlLocal;

      const btn = document.getElementById("btn")! as HTMLButtonElement;
      if (role !== '' && username !== '' && password !== '') {
        console.log(role);

        let name: string = userSelect;
        this.http.post(url, { name, username, password, role }).subscribe({
          next: () => {
            Swal.fire(`Usuario ${username} agregado`, `El rol es ${role}`, 'success');
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

   addAreaAlert(e: Event) {
    const url=(this.env.sucursal as any).urlLocal;
    this.http.get(url).subscribe(response=>{
      this.data=response;
    });
    
    let optionsHtml!:string;
    this.data.forEach((item: any) => {
      if(item!=null){
        optionsHtml += `<option value="${item.id}">${item.nombreSucursal}</option>`;
      }
    });

    e.preventDefault();
    Swal.fire({
      title: 'Agregar Area',
      showConfirmButton: false,
      html: `
        <form id="editAreaForm">

          <div class="mb-3">
            <label for="area" class="form-label">Area</label>
            <input type="text" class="form-control" id="area" name='area'>
          </div

          <div class="mb-3">
            <label for="cantidadEmpleados" class="form-label">Cantidad Empleados</label>
            <input type="number" class="form-control" id="cantidadEmpleados" name='cantidadEmpleados'>
          </div>

          <div class="mb-3">
            <label for="puntajeTotal" class="form-label">Puntaje Total</label>
            <input type="number" class="form-control" id="puntajeTotal" name='puntajeTotal'>
          </div>

           <div class="mb-3">
            <label for="rendimientoArea" class="form-label">Rendimiento Area</label>
            <input type="number" class="form-control" id="rendimientoArea" name='rendimientoArea'>
          </div>

          <div class="mb-3">
            <label for="sucursal" class="form-label">Sucursal</label>
            <input type="text" class="form-control" id="sucursal" name='sucursal'>
          </div
        
          <div>
          <button type="submit" class="btn btn-primary" id='btn'>Enviar</button>
          </div>
        </form>
      `,
      focusConfirm: false,
    }).then(() => {

    });

    const form = document.getElementById('editAreaForm') as HTMLFormElement;

    form?.addEventListener('submit', (submitEvent) => {
      submitEvent.preventDefault();

      const userSelect = (document.getElementById('userSelect') as HTMLSelectElement).value;
      const username = (document.getElementById('username') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
      const role = (document.getElementById('role') as HTMLSelectElement).value;

      const url = (this.env.usuarios as any).urlLocal;

      const btn = document.getElementById("btn")! as HTMLButtonElement;
      if (role !== '' && username !== '' && password !== '') {
        console.log(role);

        let name: string = userSelect;
        this.http.post(url, { name, username, password, role }).subscribe({
          next: () => {
            Swal.fire(`Usuario ${username} agregado`, `El rol es ${role}`, 'success');
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
  

}
