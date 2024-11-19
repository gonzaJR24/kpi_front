import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{
  usuarios:any;
  data:any;
  constructor(private http:HttpClient, private env:EnvironmentService){}

  ngOnInit(): void {
    const url=(this.env.usuarios as any).urlLocal;
    this.http.get(url).subscribe(response=>{
      this.usuarios=response
    })
  }

  AddAUserlert(e: Event) {
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
      title: 'Agregar Usuario',
      showConfirmButton: false,
      html: `
        <form id="addUserForm">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" name='nombres'>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Apellido</label>
            <input type="text" class="form-control" id="name" name='apellidos'>
          </div>
          <div class="mb-3">
            <label for="sucursal" class="form-label">sucursal</label>
            <select class="form-select" id="sucursal" name='sucursal'>
              <option selected>--seleccione--</option>
              ${optionsHtml}
            </select>
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">Usuario</label>
            <input type="text" class="form-control" id="username" name='username'>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contrasena</label>
            <input type="text" class="form-control" id="password" name='password'>
          </div>
          <div class="mb-3">
            <label for="tipoUsuario" class="form-label">Tipo Usuario</label>
            <select class="form-select" id="tipoUsuario" name='tipoUsuario'>
              <option selected>--seleccione--</option>
              <option value="STANDARD">STANDARD</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="correo" class="form-label">Correo</label>
            <input type="email" class="form-control" id="correo" name='correo'>
          </div>
          <button type="submit" class="btn btn-primary" id='btn'>Submit</button>
        </form>
      `,
      focusConfirm: false,
    }).then(() => {

    });

    const form = document.getElementById('addUserForm') as HTMLFormElement;

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

  EditUserlert(e: Event) {
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
      title: 'Editar Usuario',
      showConfirmButton: false,
      html: `
        <form id="addUserForm">
          <div class="mb-3">
            <label for="sucursal" class="form-label">Sucursal</label>
            <select class="form-select" id="sucursal" name='sucursal'>
              <option selected>--seleccione--</option>
              ${optionsHtml}
            </select>
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">Usuario</label>
            <input type="text" class="form-control" id="username" name='username'>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contrasena</label>
            <input type="text" class="form-control" id="password" name='password'>
          </div>
          <div class="mb-3">
            <label for="tipoUsuario" class="form-label">Tipo Usuario</label>
            <select class="form-select" id="tipoUsuario" name='tipoUsuario'>
              <option selected>--seleccione--</option>
              <option value="STANDARD">STANDARD</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="correo" class="form-label">Correo</label>
            <input type="email" class="form-control" id="correo" name='correo'>
          </div>
          <button type="submit" class="btn btn-primary" id='btn'>Submit</button>
        </form>
      `,
      focusConfirm: false,
    }).then(() => {

    });

    const form = document.getElementById('addUserForm') as HTMLFormElement;

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
