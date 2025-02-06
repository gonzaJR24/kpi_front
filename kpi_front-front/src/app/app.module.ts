import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule, routes } from './app-routing.module'; // Import routes
import { AppComponent } from './app.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { AreaComponent } from './area/area.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { PuntajeComponent } from './puntaje/puntaje.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EvaluarComponent } from './evaluar/evaluar.component';
import { CardComponent } from './card/card.component';
import { EmpresaBarComponent } from './empresa-bar/empresa-bar.component';
import { EmpleadoGraphComponent } from './empleado-graph/empleado-graph.component';
import { RadiusComponent } from './radius/radius.component';
import { UpdateProgressComponent } from './update-progress/update-progress.component';
import { EmpresaUsuarioComponent } from './empresa-usuario/empresa-usuario.component';
import { HomeUsuarioComponent } from './home-usuario/home-usuario.component';
import { EmpleadoUserComponent } from './empleado-user/empleado-user.component';
import { EvaluarUserComponent } from './evaluar-user/evaluar-user.component';
import { PuntajeUserComponent } from './puntaje-user/puntaje-user.component';
import { CommonModule, DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    EmpresaComponent,
    AreaComponent,
    EmpleadosComponent,
    PuntajeComponent,
    UsuarioComponent,
    HomeComponent,
    EvaluarComponent,
    CardComponent,
    EmpresaBarComponent,
    EmpleadoGraphComponent,
    RadiusComponent,
    UpdateProgressComponent,
    EmpresaUsuarioComponent,
    HomeUsuarioComponent,
    EmpleadoUserComponent,
    EvaluarUserComponent,
    PuntajeUserComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes), // Use the imported routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }