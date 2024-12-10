import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrl: './evaluar.component.css'
})
export class EvaluarComponent {

  data:any;
  empleados:any[]=[];
  constructor(private http:HttpClient, private env:EnvironmentService){}

  ngOnInit(): void {

    const url = (this.env.empleados as any).urlLocal;
    this.http.get(url).subscribe(response => {
      if(response){
        for(let empleado of response as any){
          this.empleados.push({name:empleado.nombre+" "+empleado.apellido, id:empleado.id})
        }
      }
    });
  }
  

  addPuntajeAlert(e: Event){
    console.log(this.empleados);
    e.preventDefault()

    console.log(this.empleados);


      const empleado = (document.getElementById('empleado') as HTMLSelectElement).value;
      const actitudesGestionComportamientoInput = (document.getElementById('actitudes') as HTMLInputElement).value;
      const ausenciaPuntualidadInput = (document.getElementById('puntualidad') as HTMLInputElement).value;
      const calificacionLiderInput = (document.getElementById('calificacionLider') as HTMLSelectElement).value;
      const npsInput = (document.getElementById('nps') as HTMLSelectElement).value;
      const especifico1Input = (document.getElementById('especifico1') as HTMLSelectElement).value;
      const especifico2Input = (document.getElementById('especifico2') as HTMLSelectElement).value;
      const comentario = (document.getElementById('comentario') as HTMLSelectElement).value;

      const url = (this.env.puntaje as any).urlLocal;

      let especifico2:number=Number(especifico2Input)
      let actitudesGestionComportamiento:number=Number(actitudesGestionComportamientoInput);
      let ausenciaPuntualidad:number=Number(ausenciaPuntualidadInput)
      let calificacionLider:number=Number(calificacionLiderInput);
      let nps:number=Number(npsInput);
      let especifico1:number=Number(especifico1Input);

      if (empleado !== '') {
        console.log(empleado);
        this.http.post(url, { ausenciaPuntualidad, especifico1, especifico2, nps, actitudesGestionComportamiento, calificacionLider,
          comentario, empleado
         }).subscribe({
          next: () => {
            Swal.fire(`Empleado evaluado`, 'success');
            setTimeout(() => {
              this.ngOnInit();
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


