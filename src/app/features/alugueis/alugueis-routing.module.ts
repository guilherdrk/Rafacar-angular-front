import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AluguelCreateComponent } from './page/aluguel-create/aluguel-create.component';
import { AluguelDevolucaoComponent } from './page/aluguel-devolucao/aluguel-devolucao.component';

const routes: Routes = [
  { path: 'novo', component: AluguelCreateComponent },
  { path: 'devolucao', component: AluguelDevolucaoComponent },
  { path: '', pathMatch: 'full', redirectTo: 'novo'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlugueisRoutingModule { }
