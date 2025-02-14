import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puntaje-user',
  templateUrl: './puntaje-user.component.html',
  styleUrl: './puntaje-user.component.css'
})
export class PuntajeUserComponent{
puntajes: any;
  data: any;
  nombre!: string;
  constructor(private http: HttpClient, private env: EnvironmentService, private routes:Router) { }
 

   EditPuntajeAlert(e: Event, puntaje: any) {
      e.preventDefault()
  
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
      })
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
              this.routes.navigate(["puntaje"]);
            },
  
          });
          Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
      });
    };
  

 

    async showReport(item: any, id: number, comentario: string, calificacionLider: number, date:string) {
      this.findByDate(date)
      let url = (this.env.empleados as any).urlLocal;
    
      const response: any = await this.http.get(`${url}/update-and-get/${id}`).toPromise();
      console.log(response);
    
      let nombreEmpleado = response.nombre + " " + response.apellido;
      let area = response.area.nombreArea;
      let cargo = response.cargo.nombreCargo;
      let mesDate = new Date(response.cargo.presupuesto.date);
      let formatttedMonth = mesDate.toLocaleString('default', { month: 'long' });
      let mes = formatttedMonth.charAt(0).toUpperCase() + String(formatttedMonth).slice(1);
      let lider = response.evaluador
      let montofinal = response.monto * (response.rendimiento / 100);
      let rendimiento = item.empleado.rendimiento;
    
      const pdfResponse: any = await this.http.post('http://192.168.4.206:8082/view-pdf', { nombreEmpleado, area, cargo, mes, lider, calificacionLider, montofinal, comentario, rendimiento }, { responseType: 'blob' }).toPromise();
    
      const blob = new Blob([pdfResponse], { type: 'application/pdf' });
      const urlPdf = window.URL.createObjectURL(blob);
      window.open(urlPdf);
    }

    findByDate(monthString: string){
      let [yearStr, monthStr] = monthString.split("-");
      let mes: number = Number(monthStr)
      let anio: number = Number(yearStr)
      console.log(typeof(mes), anio);
      let url="http://192.168.4.206:8082/api/puntaje/find";
      this.http.post(url,{mes, anio}).subscribe(response=>{
        this.puntajes=response;
      })
    }

    deletePuntaje(e: Event, id: number) {
        console.log("borrando?");
        e.preventDefault()
        const url = (this.env.puntaje as any).urlLocal +"/"+ id
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
              next: () => {
                Swal.fire(`Puntaje eliminado`, 'success');
                  this.routes.navigate(["puntajeUsuario"]);
              }
            });
    
          }
        });
      }
}
