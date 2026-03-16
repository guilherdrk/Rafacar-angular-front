import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceiroDashboardComponent } from './page/financeiro-dashboard/financeiro-dashboard.component';

const routes: Routes = [
  { path:'', component: FinanceiroDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
