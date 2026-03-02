import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { VeiculosRoutingModule } from './veiculos-routing.module';

import { VeiculoListaComponent } from './page/veiculo-lista/veiculo-lista.component';
import { VeiculoCreateDialogComponent } from './components/veiculo-create-dialog/veiculo-create-dialog.component';
import { VeiculoManuntencaoDialogComponent } from './components/veiculo-manuntencao-dialog/veiculo-manuntencao-dialog.component';

@NgModule({
  declarations: [
    VeiculoListaComponent,
    VeiculoCreateDialogComponent,
    VeiculoManuntencaoDialogComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    VeiculosRoutingModule
  ],
})
export class VeiculosModule {}
