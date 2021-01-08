import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from '../shared/shared.module'
import {AdminRoutingModule} from './admin-routing.module'
import {MaterialModule} from '../material'
import { DataTablesModule } from 'angular-datatables';
import { AdminDatasetsComponent } from './admin-datasets/admin-datasets.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { AdminComponent } from './admin/admin.component';
import { FiltersComponent } from './admin-tools/filters/filters.component';
import { DatasetFiltersComponent } from './admin-datasets/filters/filters.component';
import { SamplesExperimentsComponent } from './admin-tools/samples-experiments/samples-experiments.component';
import { TagsComponent } from './admin-datasets/tags/tags.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminSideHeader,AdminTopHeader } from './admin/headers/headers';
import { AdminFaqsComponent ,AdminNewFaqsComponent} from './admin-home/admin-faqs/admin-faqs.component';


@NgModule({
  declarations: [
    AdminDatasetsComponent,
    AdminToolsComponent,
    AdminUsersComponent,
    AdminComponent,
    FiltersComponent,
    DatasetFiltersComponent,
    SamplesExperimentsComponent,
    TagsComponent,
    DashboardComponent,
    AdminSideHeader,AdminTopHeader, AdminFaqsComponent,AdminNewFaqsComponent
  ],
  imports: [
    CommonModule,FormsModule, FormsModule,ReactiveFormsModule,BrowserModule, 
    SharedModule,
    AdminRoutingModule,
    MaterialModule,
    DataTablesModule
  ],
  exports:[
    AdminComponent,
  ]
})
export class AdminModule { }
