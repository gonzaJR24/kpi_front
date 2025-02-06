import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EnvironmentService } from '../environment.service';


@Component({
  selector: 'app-update-progress',
  templateUrl: './update-progress.component.html',
  styleUrl: './update-progress.component.css'
})
export class UpdateProgressComponent {
 constructor(private routes: Router, private http: HttpClient, private env:EnvironmentService) { }

  redirectEmpresa() {
    this.routes.navigate(['empresa'])
  }


  editEmpresa(){
    let url=(this.env.empresa as any).urlLocal
    let valorMeta=(document.getElementById("valorMeta") as HTMLInputElement).value;
    let progresoEmpresa=(document.getElementById("progresoEmpresa") as HTMLInputElement).value;
    this.http.put(url,{progresoEmpresa,valorMeta}).subscribe(response=>{
      console.log(response);
    })
    alert("Datos Empresa Modificados")
    this.redirectEmpresa()

  }

  redirectUpgrade() {
    this.routes.navigate(['updateProgress'])
  }
}
