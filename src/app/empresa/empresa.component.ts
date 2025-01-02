import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent implements OnInit {
  imgUrl: string = "https://github.com/gonzaJR24/HTML-CSS/blob/main/menu/Logo-fondomorado.png?raw=true";
  date!: string;
  progreso: any;
  meta: any;
  montoProductividad!: number;
  montoDireccionMedica!: number;
  montoOperaciones!: number;
  montoServiciosGenerales: any
  montoFacturacion: any
  montoContabilidad!: number;
  dataAreas: any = [];
  cumplimiento: number = 0;
  grado1!:number;
  grado2!:number;

  constructor(private routes: Router, private http: HttpClient) { }

  @ViewChild('myChart', { static: true }) myChart!: ElementRef;

  ngOnInit(): void {

    this.http.get("http://localhost:8080/api/empresa").subscribe((response: any) => {
      this.progreso = "RD$ " + response[0].progresoEmpresa;
      this.meta = "RD$ " + response[0].valorMeta;
      this.cumplimiento = (response[0].progresoEmpresa * 100) / response[0].valorMeta;
      if (this.cumplimiento >= 50) {
        this.grado1 = 180;
        let residual = (this.cumplimiento * 3.6) - 180;
        this.grado2 = residual;
        document.documentElement.style.setProperty('--fin', this.grado1 + "deg");
        document.documentElement.style.setProperty('--fin2', this.grado2 + "deg");
    } else {
        this.grado1 = this.cumplimiento * 3.6;
        document.documentElement.style.setProperty('--fin', this.grado1 + "deg");
    }
    

    })

    this.http.get("http://localhost:8080/api/area").subscribe((response: any) => {
      this.dataAreas = response;
      this.cargarDatos();
    })


    this.http.get("http://localhost:8080/api/presupuesto/ultimoPresupuesto").subscribe((response: any) => {
      this.date=response.date;
    })

    this.http.get("http://localhost:8080/api/empleado/findByArea").subscribe(response=>{
      console.log(response);
    })

  }

  mostrarGrafica() {
    // Crear el gráfico después de que la vista esté inicializada
    new Chart(this.myChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Productividad', 'Direccion Medica', 'Operaciones', 'Servicios Generales', 'Facturacion', 'Contabilidad'],
        datasets: [{
          label: '% Rendimiento',
          data: [this.montoProductividad, this.montoDireccionMedica, this.montoOperaciones, this.montoServiciosGenerales, this.montoFacturacion, this.montoContabilidad],
          backgroundColor: [
            'rgba(255, 99, 133, 0.78)',
            'rgba(212, 235, 251, 0.88)',
            'rgba(255, 207, 86, 0.89)',
            'rgba(75, 192, 192, 0.88)',
            'rgba(153, 102, 255, 0.88)',
            'rgba(255, 160, 64, 0.9)'
          ],

        },{
          type: 'line', // Line dataset
          label: '',
          data: [this.montoProductividad, this.montoDireccionMedica, this.montoOperaciones, this.montoServiciosGenerales, this.montoFacturacion, this.montoContabilidad],
          borderColor: 'rgb(238, 234, 0)',
          borderWidth: 3,
          fill: true,
          tension: 0.6, // Smoother line
        },]
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

  cargarDatos() {
    for (let area of this.dataAreas) {
      switch (area.nombreArea) {
        case "Productividad":
          this.montoProductividad = Number(area.rendimientoArea * 10)
          break;
        case "Direccion Medica":
          this.montoDireccionMedica = area.rendimientoArea * 10
          break;
        case "Operaciones":
          this.montoOperaciones = area.rendimientoArea * 10;
          break;
        case "Servicios Generales":
          this.montoServiciosGenerales = area.rendimientoArea * 10
          break;
        case "Facturacion":
          this.montoFacturacion = area.rendimientoArea * 10
          break;
        case "Contabilidad":
          this.montoContabilidad = Number(area.rendimientoArea * 10)
          break;
      }
    }

    this.mostrarGrafica()

  }

  redirectEmpresaBar() {
    this.routes.navigate(['empresaBar'])
  }

  redirectEmpresa() {
    this.routes.navigate(['empresa'])
  }

  redirectEmpleadoBar() {
    this.routes.navigate(['empleadoBar'])
  }

  redirectUpgrade() {
    this.routes.navigate(['updateProgress'])
  }
}
