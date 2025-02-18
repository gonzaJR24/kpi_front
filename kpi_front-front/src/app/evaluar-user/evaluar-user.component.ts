import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar-user.component.html',
  styleUrls: ['./evaluar-user.component.css']
})
export class EvaluarUserComponent implements OnInit {
  data: any;
  empleados: any[] = [];
  selectedEmpleado: string = '';

  actitudesGestionComportamiento: number = 0;
  ausenciaPuntualidad: number = 0;
  calificacionLider: number = 0;
  nps: number = 0;
  especifico1: number = 0;
  especifico2: number = 0;
  comentario: string = '';
  fulldate: string;

  constructor(private http: HttpClient, private env: EnvironmentService, private route: Router) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    this.fulldate = `${year}-${month}`;
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem("lider")) {
      this.route.navigate([""]);
      return;
    }

    const url = "http://192.168.4.206:8082/api/empleado/findByArea";
    const area = sessionStorage.getItem("area");
    this.http.post(url, { area }).subscribe({
      next: (response) => {
        this.empleados = (response as any[]).map(empleado => ({
          name: `${empleado.nombre} ${empleado.apellido}`,
          id: empleado.id
        })).sort((a, b) => a.name.localeCompare(b.name));
      },
      error: (err) => {
        console.error('Error cargando empleados:', err);
        Swal.fire('Error', 'No se pudieron cargar los empleados', 'error');
      }
    });
  

    this.http.get(url).subscribe({
      next: (response) => {
        this.empleados = (response as any[]).map(empleado => ({
          name: `${empleado.nombre} ${empleado.apellido}`,
          id: empleado.id
        })).sort((a, b) => a.name.localeCompare(b.name));
      },
    });
  }

  async onSubmit(dateStr: string) {
    const [yearStr, monthStr] = dateStr.split("-");
    const mes = Number(monthStr);
    const anio = Number(yearStr);

   
    const url = (this.env.puntaje as any).urlLocal;
    try {
      await this.http.post(url, {
        ausenciaPuntualidad: this.ausenciaPuntualidad,
        especifico1: this.especifico1,
        especifico2: this.especifico2,
        nps: this.nps,
        actitudesGestionComportamiento: this.actitudesGestionComportamiento,
        calificacionLider: this.calificacionLider,
        comentario: this.comentario,
        empleado: this.selectedEmpleado,
        mes: mes,
        anio: anio,
        evaluador: sessionStorage.getItem("lider")
      }).toPromise();

   
      this.resetForm();
      Swal.fire({
        title: "Empleado Evaluado :)",
        width: 600,
        padding: "3em",
        color: "#716add",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      window.location.reload();

    } catch (err) {
      console.error('Error evaluando empleado:', err);
      Swal.fire('Error', 'No se pudo guardar la evaluación', 'error');
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