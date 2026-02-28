import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'veiculos',
    loadChildren: () =>
      import('./features/veiculos/veiculos.module').then(m => m.VeiculosModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'veiculos' },
  { path: '**', redirectTo: 'veiculos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
