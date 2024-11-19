import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrl: './puntaje.component.css'
})
export class PuntajeComponent implements OnInit {
  puntajes: any;
  data: any;
  constructor(private http: HttpClient, private env: EnvironmentService) { }
  ngOnInit(): void {
    const url = (this.env.puntaje as any).urlLocal;
    this.http.get(url).subscribe(response => {
      this.puntajes = response;
    })
  }

  EditPuntajeAlert(e: Event) {
    const url = (this.env.sucursal as any).urlLocal;
    this.http.get(url).subscribe(response => {
      this.data = response;
    });

    let optionsHtml!: string;
    this.data.forEach((item: any) => {
      if (item != null) {
        optionsHtml += `<option value="${item.id}">${item.nombreSucursal}</option>`;
      }
    });

    e.preventDefault();
    Swal.fire({
      title: 'Editar Puntaje',
      showConfirmButton: false,
      html: `
        <form id="editPuntajeForm">

          <div class="mb-3">
            <label for="actitudes" class="form-label">Actitudes</label>
            <input type="number" class="form-control" id="actitudes" name='actitudes' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="puntualidad" class="form-label">Puntualidad</label>
            <input type="number" class="form-control" id="puntualidad" name='puntualidad' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="calificacionLider" class="form-label">Calificacion Lider</label>
            <input type="number" class="form-control" id="calificacionLider" name='calificacionLider' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="nps" class="form-label">NPS</label>
            <input type="number" class="form-control" id="nps" name='nps' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="especifico1" class="form-label">Especifico 1</label>
            <input type="number" class="form-control" id="especifico1" name='especifico1' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="especifico2" class="form-label">Especifico 2</label>
            <input type="number" class="form-control" id="especifico2" name='especifico2' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="puntajeTotal" class="form-label">Puntaje Total</label>
            <input type="number" class="form-control" id="puntajeTotal" name='puntajeTotal' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="comentario" class="form-label">Comentario</label>
            <input type="text" class="form-control" id="comentario" name='comentario'>
          </div>
        
          <div>
          <button type="submit" class="btn btn-primary" id='btn'>Enviar</button>
          </div>
        </form>
      `,
      focusConfirm: false,
    }).then(() => {

    });

    const form = document.getElementById('editPuntajeForm') as HTMLFormElement;

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

  addPuntajeAlert(e: Event) {
    const url = (this.env.sucursal as any).urlLocal;
    this.http.get(url).subscribe(response => {
      this.data = response;
    });

    let optionsHtml!: string;
    this.data.forEach((item: any) => {
      if (item != null) {
        optionsHtml += `<option value="${item.id}">${item.nombreSucursal}</option>`;
      }
    });

    e.preventDefault();
    Swal.fire({
      title: 'Editar Puntaje',
      showConfirmButton: false,
      html: `
        <form id="editPuntajeForm">

        <div class="mb-3">
            <label for="actitudes" class="form-label">Empleado</label>
            <input type="string" class="form-control" id="empleado" name='empleado'>
          </div>

          <div class="mb-3">
            <label for="actitudes" class="form-label">Actitudes</label>
            <input type="number" class="form-control" id="actitudes" name='actitudes' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="puntualidad" class="form-label">Puntualidad</label>
            <input type="number" class="form-control" id="puntualidad" name='puntualidad' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="calificacionLider" class="form-label">Calificacion Lider</label>
            <input type="number" class="form-control" id="calificacionLider" name='calificacionLider' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="nps" class="form-label">NPS</label>
            <input type="number" class="form-control" id="nps" name='nps' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="especifico1" class="form-label">Especifico 1</label>
            <input type="number" class="form-control" id="especifico1" name='especifico1' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="especifico2" class="form-label">Especifico 2</label>
            <input type="number" class="form-control" id="especifico2" name='especifico2' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="puntajeTotal" class="form-label">Puntaje Total</label>
            <input type="number" class="form-control" id="puntajeTotal" name='puntajeTotal' min='0' max='10'>
          </div>

          <div class="mb-3">
            <label for="comentario" class="form-label">Comentario</label>
            <input type="text" class="form-control" id="comentario" name='comentario'>
          </div>
        
          <div>
          <button type="submit" class="btn btn-primary" id='btn'>Enviar</button>
          </div>
        </form>
      `,
      focusConfirm: false,
    }).then(() => {

    });

    const form = document.getElementById('editPuntajeForm') as HTMLFormElement;

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
