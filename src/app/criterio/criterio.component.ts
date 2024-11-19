import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criterio',
  templateUrl: './criterio.component.html',
  styleUrl: './criterio.component.css'
})
export class CriterioComponent implements OnInit{
 criterios:any;
 data:any;
 constructor(private http:HttpClient, private env: EnvironmentService){}

  ngOnInit(): void {
    const url=(this.env.criterio as any).urlLocal;
    this.http.get(url).subscribe(response=>{
      this.criterios=response;
    })
  }

  EditCriterioAlert(e: Event) {
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
      title: 'Editar Criterio',
      showConfirmButton: false,
      html: `
        <form id="editCriterioForm">
          <div class="mb-3">
            <label for="criterio" class="form-label">Criterio</label>
            <input type="text" class="form-control" id="criterio" name='criterio'>
          </div
          <div class="mb-3">
            <label for="valor" class="form-label">Valor</label>
            <input type="number" class="form-control" id="valor" name='valor'>
          </div>
          <div class="mb-3">
            <label for="area" class="form-label">Area</label>
            <input type="text" class="form-control" id="area" name='area'>
          </div>
        
          <button type="submit" class="btn btn-primary" id='btn'>Enviar</button>
        </form>
      `,
      focusConfirm: false,
    }).then(() => {

    });

    const form = document.getElementById('editCriterioForm') as HTMLFormElement;

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

  addCriterioAlert(e: Event) {
    const url=(this.env.areas as any).urlLocal;
    this.http.get(url).subscribe(response=>{
      this.data=response;
    });
    
    let optionsHtml!:string;
    this.data.forEach((item: any) => {
      if(item!=null){
        optionsHtml += `<option value="${item.id}">${item.nombreArea}</option>`;
      }
    });

    e.preventDefault();
    Swal.fire({
      title: 'Agregar Criterio',
      showConfirmButton: false,
      html: `
        <form id="editCriterioForm">
          <div class="mb-3">
            <label for="criterio" class="form-label">Criterio</label>
            <input type="text" class="form-control" id="criterio" name='criterio'>
          </div
          <div class="mb-3">
            <label for="valor" class="form-label">Valor</label>
            <input type="number" class="form-control" id="valor" name='valor'>
          </div>

          <div class="mb-3">
            <label for="sucursal" class="form-label">Area</label>
            <select class="form-select" id="area" name='area'>
              <option selected>--seleccione--</option>
              ${optionsHtml}
            </select>
          </div>
        
          <button type="submit" class="btn btn-primary" id='btn'>Enviar</button>
        </form>
      `,
      focusConfirm: false,
    }).then(() => {

    });

    const form = document.getElementById('editCriterioForm') as HTMLFormElement;

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

  showDeleteAlert(e: Event, id: number) {
    e.preventDefault()
    const url = (this.env.criterio as any).deleteUserServer + id
    Swal.fire({
      title: "Esta seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "red",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si,eliminar"
    }).then((result) => {
      // This block will run after SweetAlert is closed, so no further code will execute until modal is closed
      if (result.isConfirmed) {
        this.http.delete(url).subscribe({
          error: () => {
            Swal.fire(`Usuario eliminado`, 'success');
            setTimeout(() => {
              this.ngOnInit();
            }, 1000);
          }
        });

      }
    });
  }

}
