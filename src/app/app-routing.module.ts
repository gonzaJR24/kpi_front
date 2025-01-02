import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { HomeComponent } from './home/home.component';
import { AreaComponent } from './area/area.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { PuntajeComponent } from './puntaje/puntaje.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { EvaluarComponent } from './evaluar/evaluar.component';
import { EmpresaBarComponent } from './empresa-bar/empresa-bar.component';
import { EmpleadoGraphComponent } from './empleado-graph/empleado-graph.component';
import { UpdateProgressComponent } from './update-progress/update-progress.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"empresa", component:EmpresaComponent},
  {path:"area", component:AreaComponent},
  {path:"empleado", component:EmpleadosComponent},
  {path:"puntaje", component:PuntajeComponent},
  {path:"usuario", component:UsuarioComponent},
  {path:"login", component:LoginComponent},
  {path:"evaluar", component:EvaluarComponent},
  {path:"empresaBar", component:EmpresaBarComponent},
  {path:"empleadoBar", component:EmpleadoGraphComponent},
  {path:"updateProgress", component:UpdateProgressComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
