import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from '../shared/shared.module'
import {AdminRoutingModule} from './admin-routing.module'
import {MaterialModule} from '../material'
import {CkEditorModule} from '../ckEditor/ck-editor.module'
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
import { ArticlesComponent } from './admin-home/articles/articles.component';
import { ToolsLogComponent } from './Logs/tools-log/tools-log.component';
import { DatasetsLogsComponent } from './Logs/datasets-logs/datasets-logs.component';
import { ExperimentLogComponent } from './Logs/experiment-log/experiment-log.component';


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
    AdminSideHeader,AdminTopHeader, AdminFaqsComponent,AdminNewFaqsComponent,
    ArticlesComponent,
    ToolsLogComponent,
    DatasetsLogsComponent,
    ExperimentLogComponent
  ],
  imports: [
    CommonModule,FormsModule, FormsModule,ReactiveFormsModule,BrowserModule, 
    SharedModule,
    AdminRoutingModule,
    MaterialModule,
    DataTablesModule,
    CkEditorModule
  ],
  exports:[
    AdminComponent,
  ]
})
export class AdminModule { }
