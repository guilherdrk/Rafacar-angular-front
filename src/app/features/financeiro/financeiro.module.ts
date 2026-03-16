import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing.module';
import { FinanceiroDashboardComponent } from './page/financeiro-dashboard/financeiro-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from "src/app/shared/material.module";


@NgModule({
  declarations: [
    FinanceiroDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FinanceiroRoutingModule,
    MaterialModule
]
})
export class FinanceiroModule { }
