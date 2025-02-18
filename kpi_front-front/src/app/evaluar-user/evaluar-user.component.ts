import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluar-user',
  templateUrl: './evaluar-user.component.html',
  styleUrls: ['./evaluar-user.component.css']
})
export class EvaluarUserComponent {
  data: any;
  empleados: any[] = [];

  // Variables para almacenar los valores de los inputs
  actitudesGestionComportamiento: number = 0;
  ausenciaPuntualidad: number = 0;
  calificacionLider: number = 0;
  nps: number = 0;
  especifico1: number = 0;
  especifico2: number = 0;
  comentario: string = '';

  constructor(private http: HttpClient, private env: EnvironmentService, private route: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("lider") == null) {
      this.route.navigate([""])
    }
    const url = "http://192.168.4.206:8082/api/empleado/findByArea";
    let area = sessionStorage.getItem("area");
    this.http.post(url, { area }).subscribe(response => {
      if (response) {
        for (let empleado of response as any) {
          this.empleados.push({ name: empleado.nombre + " " + empleado.apellido, id: empleado.id });
        }

        // Ordenar los empleados por nombre
        this.empleados.sort((a, b) => a.name.localeCompare(b.name));
      }
    });
  }

  addPuntajeAlert(e: Event, dateStr: string) {
    e.preventDefault();

    const empleado = (document.getElementById('empleado') as HTMLSelectElement).value;
    const comentario = this.comentario;
    let [yearStr, monthStr] = dateStr.split("-");
    let mes: number = Number(monthStr);
    let anio: number = Number(yearStr);
    const url = (this.env.puntaje as any).urlLocal;

    if (empleado !== '' && mes !== 0 && anio !== 0) {
      this.http.post(url, {
        ausenciaPuntualidad: this.ausenciaPuntualidad,
        especifico1: this.especifico1,
        especifico2: this.especifico2,
        nps: this.nps,
        actitudesGestionComportamiento: this.actitudesGestionComportamiento,
        calificacionLider: this.calificacionLider,
        comentario,
        empleado,
        mes: mes,
        anio: anio,
        evaluador: sessionStorage.getItem("lider")
      }).subscribe({
        next: () => {
          
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
    let empleado = (document.getElementById('empleado') as HTMLSelectElement);
    empleado.value = '';
    this.actitudesGestionComportamiento = 0;
    this.ausenciaPuntualidad = 0;
    this.calificacionLider = 0;
    this.nps = 0;
    this.especifico1 = 0;
    this.especifico2 = 0;
    this.comentario = '';
  }
}
