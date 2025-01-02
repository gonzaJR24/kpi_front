import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-progress',
  templateUrl: './update-progress.component.html',
  styleUrl: './update-progress.component.css'
})
export class UpdateProgressComponent {
 constructor(private routes: Router, private http: HttpClient) { }

  redirectEmpresa() {
    this.routes.navigate(['empresa'])
  }




  editEmpresa(){
    let valorMeta=(document.getElementById("valorMeta") as HTMLInputElement).value;
    let progresoEmpresa=(document.getElementById("progresoEmpresa") as HTMLInputElement).value;
    this.http.put("http://localhost:8080/api/empresa",{progresoEmpresa,valorMeta}).subscribe(response=>{
      console.log(response);
    })
    alert("Datos Empresa Modificados")
  }

  redirectUpgrade() {
    this.routes.navigate(['updateProgress'])
  }
}
