import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'] // Cambié "styleUrl" a "styleUrls"
})
export class EmpresaComponent implements OnInit {
  imgUrl: string = "https://github.com/gonzaJR24/HTML-CSS/blob/main/menu/Logo-fondomorado.png?raw=true";

  constructor(private routes:Router){}

  // Referencia al canvas del gráfico
  @ViewChild('myChart', { static: true }) myChart!: ElementRef;

  ngOnInit(): void {
    // Crear el gráfico después de que la vista esté inicializada
    new Chart(this.myChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Sistemas', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '% Rendimiento',
          data: [100, 50, 25, 12.5, 6.125, 3],
          backgroundColor: [
            'rgb(255, 99, 132 )',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)'
          ],
        }]
      },  
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  redirectEmpresaBar(){
    this.routes.navigate(['empresaBar'])
  }
  
  redirectEmpresa(){
    this.routes.navigate(['empresa'])
  }

  redirectEmpleadoBar(){
    this.routes.navigate(['empleadoBar'])
  }

}
