import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.css']
})
export class PuntajeComponent implements OnInit {
  puntajes: any;
  data: any;
  nombre!: string;
  selectedDate: string = ''; // Variable para almacenar la fecha seleccionada

  constructor(private http: HttpClient, private env: EnvironmentService, private routes: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("lider")==null){
      this.routes.navigate([""])
    }

  }

  EditPuntajeAlert(e: Event, puntaje: any) {
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
    });

    const form = document.getElementById('editPuntajeForm') as HTMLFormElement;

    form?.addEventListener('submit', (submitEvent) => {
      submitEvent.preventDefault();

      const actitudesGestionComportamiento = (document.getElementById('actitudes') as HTMLInputElement).value;
      const ausenciaPuntualidad = (document.getElementById('puntualidad') as HTMLInputElement).value;
      const calificacionLider = (document.getElementById('calificacionLider') as HTMLInputElement).value;
      const nps = (document.getElementById('nps') as HTMLInputElement).value;
      const especifico1 = (document.getElementById('especifico1') as HTMLInputElement).value;
      const especifico2 = (document.getElementById('especifico2') as HTMLInputElement).value;
      const comentario = (document.getElementById('comentario') as HTMLInputElement).value;

      const urlEditPuntaje = (this.env.puntaje as any).urlLocal;

      this.http.put(`${urlEditPuntaje}/${puntaje.id}`, {
        ausenciaPuntualidad, especifico1, especifico2, nps, actitudesGestionComportamiento, calificacionLider, comentario
      }).subscribe({
        next: () => {
          Swal.fire(`Puntaje editado`, 'success');
          // Refrescar los datos después de editar
          this.findByDate(this.selectedDate); // Usa la fecha seleccionada
        },
        error: (error) => {
          console.error('Error al editar el puntaje:', error);
          Swal.fire('Error', 'No se pudo editar el puntaje', 'error');
        }
      });
    });
  }

  deletePuntaje(e: Event, id: number) {
    e.preventDefault();
    const url = (this.env.puntaje as any).urlLocal + "/" + id;

    Swal.fire({
      title: "¿Está seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "red",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(url).subscribe({
          next: () => {
            Swal.fire(`Puntaje eliminado`, 'success');
            // Refrescar los datos después de eliminar
            this.findByDate(this.selectedDate); // Usa la fecha seleccionada
          },
          error: (error) => {
            console.error('Error al eliminar el puntaje:', error);
            Swal.fire('Error', 'No se pudo eliminar el puntaje', 'error');
          }
        });
      }
    });
  }

  async findByDate(monthString: string): Promise<void> {
    this.selectedDate = monthString;
    let [yearStr, monthStr] = monthString.split("-");
    let mes: number = Number(monthStr);
    let anio: number = Number(yearStr);
    let url = "http://192.168.4.206:8082/api/puntaje/find";

    try {
      const puntajes2 = await this.http.post<any>(url, { mes, anio }, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }).toPromise();

      this.puntajes = puntajes2;
    } catch (error) {
      console.error('Error al cargar los puntajes:', error);
      Swal.fire('Error', 'No se pudieron cargar los puntajes', 'error');
    }
  }

  async showReport(item: any, id: number, comentario: string, calificacionLider: number, date: string) {
      this.findByDate(date); // Asegura que los datos estén actualizados
  
    let url = (this.env.empleados as any).urlLocal;
  
    try {
      // Obtén los datos actualizados del empleado
      const response: any = await this.http.get(`${url}/update-and-get/${id}`).toPromise();
  
      let nombreEmpleado = response.nombre + " " + response.apellido;
      let area = response.area.nombreArea;
      let cargo = response.cargo.nombreCargo;
      let mesDate = new Date(response.cargo.presupuesto.date);
      let formatttedMonth = mesDate.toLocaleString('default', { month: 'long' });
      let mes = formatttedMonth.charAt(0).toUpperCase() + String(formatttedMonth).slice(1);
      let lider = item.evaluador;
      let montofinal = response.monto * (response.rendimiento / 100);
      let rendimiento = response.rendimiento; // Usa el rendimiento actualizado
      let evaluador = item.evaluador;
  
      // Genera el PDF con los datos actualizados
      const pdfResponse: any = await this.http.post(
        'http://192.168.4.206:8082/view-pdf',
        { nombreEmpleado, area, cargo, mes, lider, calificacionLider, montofinal, comentario, rendimiento, evaluador },
        { responseType: 'blob' }
      ).toPromise();
  
      const blob = new Blob([pdfResponse], { type: 'application/pdf' });
      const urlPdf = window.URL.createObjectURL(blob);
      window.open(urlPdf);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      Swal.fire('Error', 'No se pudo generar el reporte', 'error');
    }
  }
  
}