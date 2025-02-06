import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { AreaComponent } from './area/area.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { PuntajeComponent } from './puntaje/puntaje.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { EvaluarComponent } from './evaluar/evaluar.component';
import { EmpresaBarComponent } from './empresa-bar/empresa-bar.component';
import { EmpleadoGraphComponent } from './empleado-graph/empleado-graph.component';
import { UpdateProgressComponent } from './update-progress/update-progress.component';
import { EmpresaUsuarioComponent } from './empresa-usuario/empresa-usuario.component';
import { HomeUsuarioComponent } from './home-usuario/home-usuario.component';
import { EmpleadoUserComponent } from './empleado-user/empleado-user.component';
import { EvaluarUserComponent } from './evaluar-user/evaluar-user.component';
import { PuntajeUserComponent } from './puntaje-user/puntaje-user.component';


 export const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"empresa", component:EmpresaComponent},
  {path:"area", component:AreaComponent},
  {path:"empleado", component:EmpleadosComponent},
  {path:"puntaje", component:PuntajeComponent},
  {path:"usuario", component:UsuarioComponent},
  {path:"evaluar", component:EvaluarComponent},
  {path:"empresaBar", component:EmpresaBarComponent},
  {path:"empleadoBar", component:EmpleadoGraphComponent},
  {path:"updateProgress", component:UpdateProgressComponent},
  {path:"empresaUsuario", component:EmpresaUsuarioComponent},
  {path:"homeUsuario", component:HomeUsuarioComponent},
  {path:"empleadoUsuario", component:EmpleadoUserComponent},
  {path:"evaluarUsuario", component:EvaluarUserComponent},
  {path:"puntajeUsuario", component:PuntajeUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 
  providers: [] 
})
export class AppRoutingModule { }
