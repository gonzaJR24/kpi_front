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
  nombre!:string;
  constructor(private http: HttpClient, private env: EnvironmentService) { }
  ngOnInit(): void {
    const url = (this.env.puntaje as any).urlLocal;
    this.http.get(url).subscribe(response => {
      this.puntajes = response;
    })
  }

  EditPuntajeAlert(e: Event, puntaje: any) {
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
            <input type="number" class="form-control" id="actitudes" name='actitudes' min='0' max='10' value="${puntaje.actitudesGestionComportamiento}">
          </div>

          <div class="mb-3">
            <label for="puntualidad" class="form-label">Puntualidad</label>
            <input type="number" class="form-control" id="puntualidad" name='puntualidad' min='0' max='10' value="${puntaje.ausenciaPuntualidad}">
          </div>

          <div class="mb-3">
            <label for="calificacionLider" class="form-label">Calificacion Lider</label>
            <input type="number" class="form-control" id="calificacionLider" name='calificacionLider' min='0' max='10' value="${puntaje.calificacionLider}">
          </div>

          <div class="mb-3">
            <label for="nps" class="form-label">NPS</label>
            <input type="number" class="form-control" id="nps" name='nps' min='0' max='10' value="${puntaje.nps}">
          </div>

          <div class="mb-3">
            <label for="especifico1" class="form-label">Especifico 1</label>
            <input type="number" class="form-control" id="especifico1" name='especifico1' min='0' max='10' value="${puntaje.especifico1}">
          </div>

          <div class="mb-3">
            <label for="especifico2" class="form-label">Especifico 2</label>
            <input type="number" class="form-control" id="especifico2" name='especifico2' min='0' max='10' value="${puntaje.especifico2}">
          </div>

          <div class="mb-3">
            <label for="comentario" class="form-label">Comentario</label>
            <input type="text" class="form-control" id="comentario" name='comentario' value="${puntaje.comentario}">
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

      const actitudesGestionComportamiento = (document.getElementById('actitudes') as HTMLSelectElement).value;
      const ausenciaPuntualidad = (document.getElementById('puntualidad') as HTMLInputElement).value;
      const calificacionLider = (document.getElementById('calificacionLider') as HTMLInputElement).value;
      const nps = (document.getElementById('nps') as HTMLInputElement).value;
      const especifico1 = (document.getElementById('especifico1') as HTMLSelectElement).value;
      const especifico2 = (document.getElementById('especifico2') as HTMLSelectElement).value;
      const comentario = (document.getElementById('comentario') as HTMLSelectElement).value;

      const url = (this.env.usuarios as any).urlLocal;

      if (actitudesGestionComportamiento !== '' && ausenciaPuntualidad !== '' && calificacionLider !== '' && nps !== '' && especifico1 !== '' && especifico2 !== ''
        && comentario !== ''
      ) {
        
        let urlEditPuntaje=(this.env.puntaje as any).urlLocal
        this.http.put(urlEditPuntaje+"/"+puntaje.id, {ausenciaPuntualidad,  especifico1, especifico2, nps, actitudesGestionComportamiento, calificacionLider, comentario
        }).subscribe({
          next: () => {
            Swal.fire(`Usuario editado`, 'success');
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
