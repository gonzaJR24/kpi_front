import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-empresa-bar',
  templateUrl: './empresa-bar.component.html',
  styleUrl: './empresa-bar.component.css'
})
export class EmpresaBarComponent {
  constructor(private routes:Router){}
  redirectEmpresaBar(){
    this.routes.navigate(['empresaBar'])
  }

  redirectEmpresa(){
    this.routes.navigate(['empresa'])
  }

  
  redirectEmpleadoBar(){
    this.routes.navigate(['empleadoBar'])
  }

  ngOnInit(): void {
    this.createStackedBarLineChart();
  }

  createStackedBarLineChart(): void {
    const ctx = document.getElementById('stackedBarLineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar', // Base type is 'bar'
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Sept', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            type: 'bar', // Stacked bar dataset
            label: 'Rendimiento',
            data: [30, 40, 45, 50, 60, 70,100,89,43,78,45,97],
            backgroundColor: 'rgb(139, 14, 139)',
            stack: 'combined', // Stacking group identifier
          },
          
          {
            type: 'line', // Line dataset
            label: '',
            data: [30, 40, 45, 50, 60, 70,100,89,43,78,45,97],
            borderColor: 'rgb(210, 39, 76)',
            borderWidth: 3,
            fill: true,
            tension: 1, // Smoother line
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
  }
}
