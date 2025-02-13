import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrl: './puntaje.component.css'
})
export class PuntajeComponent implements OnInit {
  puntajes: any;
  data: any;
  nombre!: string;
  constructor(private http: HttpClient, private env: EnvironmentService, private routes:Router) { }
  ngOnInit(): void {
    this.routes.navigate(['puntaje'])
    // const url = (this.env.puntaje as any).urlLocal;
    // this.http.get(url).subscribe(response => {
    //   this.puntajes = response;
    // })
  }

  EditPuntajeAlert(e: Event, puntaje: any) {
    e.preventDefault();

    Swal.fire({
        title: 'Editar Puntaje',
        showConfirmButton: false,
        html: `
            <form id="editPuntajeForm">
                <!-- Campos del formulario -->
            </form>
        `,
        focusConfirm: false,
    });

    const form = document.getElementById('editPuntajeForm') as HTMLFormElement;

    form?.addEventListener('submit', async (submitEvent) => {
        submitEvent.preventDefault();

        const actitudesGestionComportamiento = (document.getElementById('actitudes') as HTMLInputElement).value;
        const ausenciaPuntualidad = (document.getElementById('puntualidad') as HTMLInputElement).value;
        const calificacionLider = (document.getElementById('calificacionLider') as HTMLInputElement).value;
        const nps = (document.getElementById('nps') as HTMLInputElement).value;
        const especifico1 = (document.getElementById('especifico1') as HTMLInputElement).value;
        const especifico2 = (document.getElementById('especifico2') as HTMLInputElement).value;
        const comentario = (document.getElementById('comentario') as HTMLInputElement).value;

        const urlEditPuntaje = (this.env.puntaje as any).urlLocal;

        try {
            await this.http.put(`${urlEditPuntaje}/${puntaje.id}`, {
                ausenciaPuntualidad, especifico1, especifico2, nps, actitudesGestionComportamiento, calificacionLider, comentario
            }).toPromise();

            Swal.fire(`Puntaje editado`, 'success');
            this.ngOnInit(); // Recargar los datos
        } catch (error) {
            Swal.fire('Error', 'No se pudo editar el puntaje', 'error');
        }
    });
}





  async showReport(item: any, id: number, comentario: string, calificacionLider: number) {
    let url = (this.env.empleados as any).urlLocal;
  
    // Espera a que el backend actualice los datos
    const response: any = await this.http.get(`${url}/update-and-get/${id}`).toPromise();
    console.log(response);
  
    let nombreEmpleado = response.nombre + " " + response.apellido;
    let area = response.area.nombreArea;
    let cargo = response.cargo.nombreCargo;
    let mesDate = new Date(response.cargo.presupuesto.date);
    let formatttedMonth = mesDate.toLocaleString('default', { month: 'long' });
    let mes = formatttedMonth.charAt(0).toUpperCase() + String(formatttedMonth).slice(1);
    let lider = sessionStorage.getItem("lider");
    let montofinal = response.monto * (response.rendimiento / 100);
    let rendimiento = item.empleado.rendimiento;
  
    const pdfResponse: any = await this.http.post('http://192.168.4.206:8082/view-pdf', { nombreEmpleado, area, cargo, mes, lider, calificacionLider, montofinal, comentario, rendimiento }, { responseType: 'blob' }).toPromise();
  
    const blob = new Blob([pdfResponse], { type: 'application/pdf' });
    const urlPdf = window.URL.createObjectURL(blob);
    window.open(urlPdf);
  }


  deletePuntaje(e: Event, id: number) {
    e.preventDefault()
    const url = (this.env.puntaje as any).urlLocal + "/" + id
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
            setTimeout(() => {
              this.ngOnInit();
            }, 1000);
            this.routes.navigate(["puntaje"]); // Revisar actualizacion al borrar
          }
        });

      }
    });
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
}
