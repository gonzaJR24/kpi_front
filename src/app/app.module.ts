import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { AreaComponent } from './area/area.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { PuntajeComponent } from './puntaje/puntaje.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { EvaluarComponent } from './evaluar/evaluar.component';
import { CardComponent } from './card/card.component';
import { EmpresaBarComponent } from './empresa-bar/empresa-bar.component';
import { EmpleadoGraphComponent } from './empleado-graph/empleado-graph.component';
import { RadiusComponent } from './radius/radius.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@NgModule({
  declarations: [
    AppComponent,
    EmpresaComponent,
    AreaComponent,
    EmpleadosComponent,
    PuntajeComponent,
    UsuarioComponent,
    HomeComponent,
    LoginComponent,
    EvaluarComponent,
    CardComponent,
    EmpresaBarComponent,
    EmpleadoGraphComponent,
    RadiusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
