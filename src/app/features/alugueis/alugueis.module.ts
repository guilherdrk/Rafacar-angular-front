import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlugueisRoutingModule } from './alugueis-routing.module';
import { AluguelCreateComponent } from './page/aluguel-create/aluguel-create.component';
import { AluguelDevolucaoComponent } from './page/aluguel-devolucao/aluguel-devolucao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from "src/app/shared/material.module";
import { AluguelListaComponent } from './page/aluguel-lista/aluguel-lista.component';


@NgModule({
  declarations: [
    AluguelCreateComponent,
    AluguelDevolucaoComponent,
    AluguelListaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlugueisRoutingModule,
    MaterialModule
]
})
export class AlugueisModule { }
