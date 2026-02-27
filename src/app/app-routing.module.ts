import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'veiculos',
    loadChildren: () => import('./features/veiculos/veiculos-routing.module').then(m => m.VeiculosRoutingModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'veiculos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
