import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeDashboardComponent } from './page/home-dashboard/home-dashboard.component';
import { MaterialModule } from "src/app/shared/material.module";


@NgModule({
  declarations: [
    HomeDashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
]
})
export class HomeModule { }
