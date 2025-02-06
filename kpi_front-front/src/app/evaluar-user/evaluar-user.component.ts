import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluar-user',
  templateUrl: './evaluar-user.component.html',
  styleUrl: './evaluar-user.component.css'
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

  constructor(private http: HttpClient, private env: EnvironmentService, private route:Router) { }

  ngOnInit(): void {
    const url = (this.env.empleados as any).urlLocal;
    this.http.get(url).subscribe(response => {
      if (response) {
        for (let empleado of response as any) {
          this.empleados.push({ name: empleado.nombre + " " + empleado.apellido, id: empleado.id })
        }
      }
    });
  }

  addPuntajeAlert(e: Event) {
    e.preventDefault();

    const empleado = (document.getElementById('empleado') as HTMLSelectElement).value;
    const comentario = this.comentario;

    const url = (this.env.puntaje as any).urlLocal;

    if (empleado !== '') {
      this.http.post(url, {
        ausenciaPuntualidad: this.ausenciaPuntualidad,
        especifico1: this.especifico1,
        especifico2: this.especifico2,
        nps: this.nps,
        actitudesGestionComportamiento: this.actitudesGestionComportamiento,
        calificacionLider: this.calificacionLider,
        comentario,
        empleado
      }).subscribe({
        next: () => {
          Swal.fire(`Empleado evaluado`, 'success');
          setTimeout(() => {
            this.route.navigate(["evaluar"])
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
}
