import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { HeaderOneComponent } from './home/header/header-one/header-one.component';
import { HeaderTwoComponent } from './home/header/header-two/header-two.component';
import { AccountComponent } from './home/account/account.component';
import { LoginComponent } from './home/account/login/login.component';
import { RegisterComponent } from './home/account/register/register.component';
import { ProfileComponent } from './home/account/profile/profile.component';
import { DatasetComponent } from './dataset/dataset.component';
import { NewDatasetComponent } from './dataset/new-dataset/new-dataset.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { AboutSainComponent } from './home/about-sain/about-sain.component';
import { AuthenticationService } from './authentication.service'
import {AuthGuardService} from './auth-guard.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { FooterComponent } from './home/header/footer/footer.component';
import { ToolsComponent } from './tools/tools.component';
import { NewToolComponent } from './tools/new-tool/new-tool.component';
import { ArchiComponent } from './tools/engine/archi/archi.component';
import { TitanComponent } from './tools/engine/titan/titan/titan.component';
import { GenSDSMComponent } from './tools/engine/titan/titan/gen-sdsm/gen-sdsm.component';
import { BugSpaceComponent } from './tools/engine/titan/titan/bug-space/bug-space.component';
import { RootCoverComponent } from './tools/engine/titan/titan/root-cover/root-cover.component';
import { HDSMComponent } from './tools/engine/titan/titan/hdsm/hdsm.component';
import { SDSMComponent } from './tools/engine/titan/titan/sdsm/sdsm.component';
import { ArcadeComponent } from './tools/engine/arcade/arcade.component';
import { AcdcWithSmellDetectionComponent } from './tools/engine/arcade/acdc-with-smell-detection/acdc-with-smell-detection.component';
import { BatchClusteringEngineComponent } from './tools/engine/arcade/batch-clustering-engine/batch-clustering-engine.component';
import { BatchDecayMetricAnalyzerComponent } from './tools/engine/arcade/batch-decay-metric-analyzer/batch-decay-metric-analyzer.component';
import { BatchSystemEvoComponent } from './tools/engine/arcade/batch-system-evo/batch-system-evo.component';
import { PkgsWithSmellDetectionComponent } from './tools/engine/arcade/pkgs-with-smell-detection/pkgs-with-smell-detection.component';
import { PipeExtractorComponent } from './tools/engine/arcade/pipe-extractor/pipe-extractor.component';

@NgModule({
  declarations: [
    

    AppComponent,
    HomeComponent,
    HeaderComponent,
    HeaderOneComponent,
    HeaderTwoComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DatasetComponent,
    NewDatasetComponent,
    ContactUsComponent,
    AboutSainComponent,
    LoadingSpinnerComponent,
    FooterComponent,
    ToolsComponent,
    NewToolComponent,
    ArchiComponent,
    TitanComponent,
    GenSDSMComponent,
    BugSpaceComponent,
    RootCoverComponent,
    HDSMComponent,
    SDSMComponent,
    ArcadeComponent,
    AcdcWithSmellDetectionComponent,
    BatchClusteringEngineComponent,
    BatchDecayMetricAnalyzerComponent,
    BatchSystemEvoComponent,
    PkgsWithSmellDetectionComponent,
    PipeExtractorComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],

  providers: [AuthenticationService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
