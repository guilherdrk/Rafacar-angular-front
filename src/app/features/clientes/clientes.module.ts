import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteListaComponent } from './page/cliente-lista/cliente-lista.component';
import { MaterialModule } from "src/app/shared/material.module";
import { ClienteFormDialogComponent } from './components/cliente-form-dialog/cliente-form-dialog.component';
import { ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";


@NgModule({
  declarations: [
    ClienteListaComponent,
    ClienteFormDialogComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ɵInternalFormsSharedModule
]
})
export class ClientesModule { }
