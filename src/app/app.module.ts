import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { AreaComponent } from './area/area.component';
import { CriterioComponent } from './criterio/criterio.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { PuntajeComponent } from './puntaje/puntaje.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    EmpresaComponent,
    AreaComponent,
    CriterioComponent,
    EmpleadosComponent,
    PuntajeComponent,
    UsuarioComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
