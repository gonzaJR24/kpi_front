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
  tipoUsuario:any;
  constructor(private http:HttpClient, private env:EnvironmentService){}

  ngOnInit(): void {
    const url=(this.env.usuarios as any).urlLocal;
    this.http.get(url).subscribe(response=>{
      this.usuarios=response
    })
  }

  AddAUserlert(e: Event) {
    const url=(this.env.sucursal as any).urlLocal;
    const urlTipoUsuario=(this.env.tipoUsuario as any).urlLocal;

    this.http.get(url).subscribe(response=>{
      this.data=response;
    });

    this.http.get(urlTipoUsuario).subscribe(response=>{
      this.tipoUsuario=response;
    });
    
    let optionsHtml!:string;
    let tipoUsuarioHtml!:string;

    this.data.forEach((item: any) => {
      if(item!=null){
        optionsHtml += `<option value="${item.id}">${item.nombreSucursal}</option>`;
      }
    });

    this.tipoUsuario.forEach((item: any) => {
      if(item!=null){
        tipoUsuarioHtml += `<option value="${item.idTipoUsuario}">${item.tipoUsuario}</option>`;
      }
    });

    e.preventDefault();
    Swal.fire({
      title: 'Agregar Usuario',
      showConfirmButton: false,
      html: `
        <form id="addUserForm">
          <div class="mb-3">
            <label for="nombres" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombres" name='nombres'>
          </div>
          <div class="mb-3">
            <label for="apellidos" class="form-label">Apellido</label>
            <input type="text" class="form-control" id="apellidos" name='apellidos'>
          </div>
          <div class="mb-3">
            <label for="sucursal" class="form-label">sucursal</label>
            <select class="form-select" id="sucursal" name='sucursal'>
              <option selected>--seleccione--</option>
              ${optionsHtml}
            </select>
          </div>
          <div class="mb-3">
            <label for="nombreUsuario" class="form-label">Usuario</label>
            <input type="text" class="form-control" id="nombreUsuario" name='nombreUsuario'>
          </div>
          <div class="mb-3">
            <label for="contrasena" class="form-label">Contrasena</label>
            <input type="text" class="form-control" id="contrasena" name='contrasena'>
          </div>

          <div class="mb-3">
            <label for="tipoUsuario" class="form-label">Tipo Usuario</label>
            <select class="form-select" id="tipoUsuario" name='tipoUsuario'>
              <option selected>--seleccione--</option>
              ${tipoUsuarioHtml}
            </select>
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

      const nombres = (document.getElementById('nombres') as HTMLSelectElement).value;
      const apellidos = (document.getElementById('apellidos') as HTMLInputElement).value;
      const sucursal = Number((document.getElementById('sucursal') as HTMLInputElement).value);
      const nombreUsuario = (document.getElementById('nombreUsuario') as HTMLSelectElement).value;
      const contrasena = (document.getElementById('contrasena') as HTMLSelectElement).value;
      const tipoUsuario = Number((document.getElementById('tipoUsuario') as HTMLSelectElement).value);

      const url = (this.env.usuarios as any).urlLocal;

      if (nombres !== '' && apellidos !== '' && sucursal !== 0 && nombreUsuario!=='' && contrasena!=='' &&  tipoUsuario!==0) {
        console.log(nombres, apellidos, nombreUsuario, contrasena, tipoUsuario, sucursal);
        this.http.post(url, { nombres, apellidos, nombreUsuario, contrasena, tipoUsuario, sucursal }).subscribe({
          error: () => {
            Swal.fire(`Usuario ${nombres + " " + apellidos} agregado`, 'success');
            setTimeout(() => {
              this.ngOnInit();
            }, 1000);
          }
        });
      } else {
        Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
      }
    });
  }

  



  EditUserlert(e: Event, usuario:any) {
    e.preventDefault();

    const url=(this.env.sucursal as any).urlLocal;

    this.http.get(url).subscribe(response=>{
      this.data=response;
    });
    
    let optionsHtml!:string;
    let usuariosHtml!:string;

    this.data.forEach((item: any) => {
      if(item!=null){
        optionsHtml += `<option value="${item.id}" ${item.nombreSucursal === usuario.sucursal.nombreSucursal ? 'selected' : ''}>${item.nombreSucursal}</option>`;
      }
    });
    
    const urlTipoUsuario=(this.env.tipoUsuario as any).urlLocal;
    this.http.get(urlTipoUsuario).subscribe(response=>{
      this.tipoUsuario=response;
    })

    this.tipoUsuario.forEach((item: any) => {
      if(item!=null){
        usuariosHtml += `<option value="${item.idTipoUsuario}" ${item.tipoUsuario === usuario.tipoUsuario.tipoUsuario ? 'selected' : ''}>${item.tipoUsuario}</option>`;
      }
    });
    
  

    Swal.fire({
      title: 'Editar Usuario',
      showConfirmButton: false,
      html: `
        <form id="editUserForm">

           <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" name='nombre' value='${usuario.nombres}'>
          </div>

           <div class="mb-3">
            <label for="apellido" class="form-label">Apellido</label>
            <input type="text" class="form-control" id="apellido" name='apellido' value='${usuario.apellidos}'>
          </div>

          <div class="mb-3">
            <label for="sucursal" class="form-label">Sucursal</label>
            <select class="form-select" id="sucursal" name='sucursal'>
              <option>--seleccione--</option>
              ${optionsHtml}
            </select>
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">Usuario</label>
            <input type="text" class="form-control" id="username" name='username' value='${usuario.nombre_usuario}'>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contrasena</label>
            <input type="text" class="form-control" id="password" name='password' value='${usuario.contrasena}'>
          </div>
          <div class="mb-3">
            <label for="tipoUsuario" class="form-label">Tipo Usuario</label>
            <select class="form-select" id="tipoUsuario" name='tipoUsuario'>
              <option selected>--seleccione--</option>
              ${usuariosHtml}
            </select>
          </div>
          <button type="submit" class="btn btn-primary" id='btn'>Submit</button>
        </form>
      `,
      focusConfirm: false,
    }).then(() => {

    });

    const form = document.getElementById('editUserForm') as HTMLFormElement;

    form?.addEventListener('submit', (submitEvent) => {
      submitEvent.preventDefault();
  
      let nombres = (document.getElementById('nombre') as HTMLSelectElement).value;
      let apellidos = (document.getElementById('apellido') as HTMLSelectElement).value;
      let sucursal = (document.getElementById('sucursal') as HTMLSelectElement).value;
      let nombreUsuario = (document.getElementById('username') as HTMLInputElement).value;
      let contrasena = (document.getElementById('password') as HTMLSelectElement).value;
      let tipoUsuario = (document.getElementById('tipoUsuario') as HTMLSelectElement).value;

      const url = (this.env.usuarios as any).urlLocal;

      if (usuario !== '' && contrasena !== '' && nombres !== '' && apellidos!="") {

        this.http.put(url+"/"+usuario.id, { nombres, apellidos, nombreUsuario, contrasena, tipoUsuario, sucursal}).subscribe({
          next: () => {
            Swal.fire(`Usuario editado`, 'success');
            setTimeout(() => {
              this.ngOnInit();
            }, 1000);
          },
          error: (err) => {
            console.error('Error adding user:', err);
            Swal.fire('Error', 'No se pudo editar el usuario', 'error');
          }
        });
      } else {
        Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
      }
    });
  }










  showDeleteAlert(e: Event, id: number) {
    e.preventDefault()
    const url = (this.env.usuarios as any).urlLocal + "/" + id
    console.log(url);
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
