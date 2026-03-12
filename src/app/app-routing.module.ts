import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'veiculos',
    loadChildren: () =>
      import('./features/veiculos/veiculos.module').then(m => m.VeiculosModule),
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./features/clientes/clientes.module').then(m => m.ClientesModule),
  },
  {
    path: 'alugueis',
    loadChildren: () =>
      import('./features/alugueis/alugueis.module').then(m => m.AlugueisModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'veiculos' },
  { path: '**', redirectTo: 'veiculos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
