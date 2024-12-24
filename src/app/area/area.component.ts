import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrl: './area.component.css'
})
export class AreaComponent implements OnInit {
  areaResponse: any;
  usuariosResponse: any;
  data: any;
  constructor(private http: HttpClient, private env: EnvironmentService, private router: Router) { }

  ngOnInit(): void {
    const url = (this.env.areas as any).urlLocal;
    this.http.get(url).subscribe(response => {
      this.areaResponse = response;
    })

    const urlUsuarios = (this.env.usuarios as any).urlLocal;
    this.http.get(urlUsuarios).subscribe(response => {
      this.usuariosResponse = response;
    })
  }

  EditAreaAlert(e: Event, area: any) {
    const url = (this.env.sucursal as any).urlLocal;
    this.http.get(url).subscribe(response => {
      this.data = response;
    });

    let optionsHtml!: string;
    let gerentes!:string;
    this.data.forEach((item: any) => {
      if (item != null) {
        optionsHtml += `<option value="${item.id}">${item.nombreSucursal}</option>`;
      }
    });

    this.usuariosResponse.forEach((gerente:any)=>{
      if(gerente.tipoUsuario.tipoUsuario=="admin"){
        gerentes+=`<option>${gerente.nombres+" "+gerente.apellidos}</option>`;
      }
    })

    e.preventDefault();
    Swal.fire({
      title: 'Editar Area',
      showConfirmButton: false,
      html: `
        <form id="editAreaForm">

          <div class="mb-3">
            <label for="nombreArea" class="form-label">Area</label>
            <input type="text" class="form-control" id="nombreArea" name='nombreArea' value="${area.nombreArea}">
          </div


          <div class="mb-3">
            <label for="sucursal" class="form-label">sucursal</label>
            <select class="form-select" id="sucursal" name='sucursal'>
              <option selected>--seleccione--</option>
              ${optionsHtml}
            </select>
          </div>

          
          <div class="mt-3 mb-3">
            <label for="gerente" class="form-label">Gerente</label>
            <select class="form-select" id="gerente" name='gerente'>
              <option selected>--seleccione--</option>
              ${gerentes}
            </select>
          </div>

          <div>
          <button type="submit" class="mt-1 btn btn-primary" id='btn'>Enviar</button>
          </div>
        </form>
      `,
      focusConfirm: false,
    }).then(() => {

    });

    const form = document.getElementById('editAreaForm') as HTMLFormElement;

    form?.addEventListener('submit', (submitEvent) => {
      submitEvent.preventDefault();

      const nombreArea = (document.getElementById('nombreArea') as HTMLSelectElement).value;
      const sucursal = (document.getElementById('sucursal') as HTMLInputElement).value;
      const gerente=(document.getElementById('gerente') as HTMLSelectElement).value;

      const url = (this.env.area as any).urlLocal;

      if (nombreArea !== '' && sucursal !== '' && gerente !== '') {
        this.http.put(url+"/"+area.id, { nombreArea, sucursal, gerente }).subscribe({
          next: () => {
            Swal.fire(`Area editada`, 'success');
            setTimeout(() => {
              this.ngOnInit();
            }, 1000);
          },
          error: (err) => {
            console.error('Error editando area:', err);
            Swal.fire('Error', 'No se pudo editar el area', 'error');
          }
        });
      } else {
        Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
      }
    });
  }







  addAreaAlert(e: Event) {
    const url = (this.env.sucursal as any).urlLocal;
    this.http.get(url).subscribe(response => {
      this.data = response;
    });

    let optionsHtml!: string;
    let gerentes!:string;
    this.data.forEach((item: any) => {
      if (item != null) {
        optionsHtml += `<option value="${item.id}">${item.nombreSucursal}</option>`;
      }
    });

    this.usuariosResponse.forEach((gerente:any)=>{
      if(gerente.tipoUsuario.tipoUsuario=="admin"){
        gerentes+=`<option>${gerente.nombres+" "+gerente.apellidos}</option>`;
        // gerentes+=(gerente.nombres+" "+gerente.apellidos)
      }
    })

    e.preventDefault();
    Swal.fire({
      title: 'Agregar Area',
      showConfirmButton: false,
      html: `
        <form id="addAreaForm">

          <div class="mb-3">
            <label for="nombreArea" class="form-label">Area</label>
            <input type="text" class="form-control" id="nombreArea" name='nombreArea'>
          </div


          <div class="mb-3">
            <label for="sucursal" class="form-label">sucursal</label>
            <select class="form-select" id="sucursal" name='sucursal'>
              <option selected>--seleccione--</option>
              ${optionsHtml}
            </select>
          </div>

          
          <div class="mt-3 mb-3">
            <label for="gerente" class="form-label">Gerente</label>
            <select class="form-select" id="gerente" name='gerente'>
              <option selected>--seleccione--</option>
              ${gerentes}
            </select>
          </div>

          <div>
          <button type="submit" class="mt-1 btn btn-primary" id='btn'>Enviar</button>
          </div>
        </form>
      `,
      focusConfirm: false,
    }).then(() => {

    });

    const form = document.getElementById('addAreaForm') as HTMLFormElement;

    form?.addEventListener('submit', (submitEvent) => {
      submitEvent.preventDefault();

      const nombreArea = (document.getElementById('nombreArea') as HTMLSelectElement).value;
      const sucursal = (document.getElementById('sucursal') as HTMLInputElement).value;
      const gerente=(document.getElementById('gerente') as HTMLSelectElement).value;

      const url = (this.env.area as any).urlLocal;

      if (nombreArea !== '' && sucursal !== '' && gerente !== '') {

        this.http.post(url, { nombreArea, sucursal, gerente }).subscribe({
          next: () => {
            Swal.fire(`Area Agregada`, 'success');
            setTimeout(() => {
              this.ngOnInit();
            }, 1000);
          },
          error: (err) => {
            console.error('Error agregando area:', err);
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
    const url = (this.env.area as any).urlLocal + "/" + id
    console.log(url)
    Swal.fire({
      title: "Esta seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "red",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {

      if (result.isConfirmed) {
        this.http.delete(url).subscribe({
          next: () => {
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
