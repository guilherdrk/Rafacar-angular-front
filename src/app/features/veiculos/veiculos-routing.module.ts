import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeiculoListaComponent } from './page/veiculo-lista/veiculo-lista.component';

const routes: Routes = [{ path: '', component: VeiculoListaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeiculosRoutingModule {}
