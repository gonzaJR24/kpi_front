import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.css']
})
export class EvaluarComponent {
  data: any;
  empleados: any[] = [];
  selectedEmpleado: string = '';
  
  // Variables para almacenar los valores de los inputs
  actitudesGestionComportamiento: number = 0;
  ausenciaPuntualidad: number = 0;
  calificacionLider: number = 0;
  nps: number = 0;
  especifico1: number = 0;
  especifico2: number = 0;
  comentario: string = '';
  fulldate: string = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
  mes!:number;
  anio!:number;

  constructor(private http: HttpClient, private env: EnvironmentService, private route: Router) {}

  ngOnInit(): void {
    const url = (this.env.empleados as any).urlLocal;
    this.http.get(url).subscribe(response => {
      if (response) {
        for (let empleado of response as any) {
          this.empleados.push({ name: empleado.nombre + " " + empleado.apellido, id: empleado.id });
        }
      }
    });
  }

  onSubmit(dateStr:string) {
    let [yearStr, monthStr] = dateStr.split("-");
    let mes: number = Number(monthStr)
    let anio: number = Number(yearStr)
    const comentario = this.comentario;
    const url = (this.env.puntaje as any).urlLocal;
    

    if (this.selectedEmpleado !== '' && mes!=0 && anio!=0) {
      this.http.post(url, {
        ausenciaPuntualidad: this.ausenciaPuntualidad,
        especifico1: this.especifico1,
        especifico2: this.especifico2,
        nps: this.nps,
        actitudesGestionComportamiento: this.actitudesGestionComportamiento,
        calificacionLider: this.calificacionLider,
        comentario,
        empleado: this.selectedEmpleado,
        mes:mes,
        anio:anio
      }).subscribe({
        next: () => {
          Swal.fire('Empleado evaluado', '', 'success');

          setTimeout(() => {
            this.route.navigate(["evaluar"]);
            this.resetForm();
          }, 1000);

        },
        error: (err) => {
          console.error('Error evaluando empleado:', err);
          Swal.fire('Error', 'No se pudo agregar el usuario', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
    }
  }

  resetForm() {
    this.selectedEmpleado = '';
    this.actitudesGestionComportamiento = 0;
    this.ausenciaPuntualidad = 0;
    this.calificacionLider = 0;
    this.nps = 0;
    this.especifico1 = 0;
    this.especifico2 = 0;
    this.comentario = '';
  }
}
