import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteListaComponent } from './page/cliente-lista/cliente-lista.component';
import { MaterialModule } from "src/app/shared/material.module";


@NgModule({
  declarations: [
    ClienteListaComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule
]
})
export class ClientesModule { }
