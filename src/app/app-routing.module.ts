import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { HomeComponent } from './home/home.component';
import { AreaComponent } from './area/area.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { PuntajeComponent } from './puntaje/puntaje.component';
import { CriterioComponent } from './criterio/criterio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"empresa", component:EmpresaComponent},
  {path:"area", component:AreaComponent},
  {path:"empleado", component:EmpleadosComponent},
  {path:"puntaje", component:PuntajeComponent},
  {path:"criterio", component:CriterioComponent},
  {path:"usuario", component:UsuarioComponent},
  {path:"login", component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
