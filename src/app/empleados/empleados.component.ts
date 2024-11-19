import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit{
  public empleados:any;
  data:any;
Math: any;
  constructor(private http:HttpClient, private env:EnvironmentService){}

  ngOnInit(): void {
    const url=(this.env.empleados as any).urlLocal;
    this.http.get(url).subscribe(response=>{
      this.empleados=response;
    })
  }
  

  EditEmpleadoAlert(e: Event) {
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
      title: 'Editar Empleado',
      showConfirmButton: false,
      html: `
        <form id="editEmpleadoForm">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" name='nombre'>
          </div

          <div class="mb-3">
            <label for="apellido" class="form-label">Apellido</label>
            <input type="text" class="form-control" id="apellido" name='apellido'>
          </div>

          <label for="sexo" class="form-label">Sexo</label>
            <select class="form-select form-select-sm mb-3" id="sexo" name="sexo">
                <option selected>--seleccione--</option>
                <option value="1">masculino</option>
                <option value="2">femenino</option>
            </select>

          <label for="area" class="form-label">Area</label>
            <select class="form-select form-select-sm mb-3" id="area" name="area">
                <option selected>--seleccione--</option>
                <option value="1">Contabilidad</option>
            </select>

            <label for="cargo" class="form-label">Cargo</label>
            <select class="form-select form-select-sm mb-3" id="cargo" name="cargo">
                <option selected>--seleccione--</option>
                <option value="1">Operativo A</option>
                <option value="1">Operativo B</option>
            </select>
        
          <button type="submit" class="btn btn-primary" id='btn'>Enviar</button>
        </form>
      `,
      focusConfirm: false,
    }).then(() => {

    });

    const form = document.getElementById('editEmpleadoForm') as HTMLFormElement;

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
