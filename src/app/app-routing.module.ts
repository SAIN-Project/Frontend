import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { LoginComponent } from './home/account/login/login.component';
import { RegisterComponent } from './home/account/register/register.component';
import { ProfileComponent} from './home/account/profile/profile.component';

import { DatasetComponent } from './dataset/dataset.component';
import { NewDatasetComponent } from './dataset/new-dataset/new-dataset.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { AboutSainComponent } from './home/about-sain/about-sain.component';
import { ToolsComponent} from './tools/tools.component';
import { NewToolComponent} from './tools/new-tool/new-tool.component';

import { ArchiComponent } from './tools/engine/archi/archi.component';
import { TitanComponent} from './tools/engine/titan/titan/titan.component';
import { BugSpaceComponent} from './tools/engine/titan/titan/bug-space/bug-space.component';
import { HDSMComponent} from './tools/engine/titan/titan/hdsm/hdsm.component';
import { SDSMComponent} from './tools/engine/titan/titan/sdsm/sdsm.component';
import { RootCoverComponent} from './tools/engine/titan/titan/root-cover/root-cover.component';

import { ArcadeComponent} from './tools/engine/arcade/arcade.component';
import { AcdcWithSmellDetectionComponent } from './tools/engine/arcade/acdc-with-smell-detection/acdc-with-smell-detection.component';
import { BatchClusteringEngineComponent } from './tools/engine/arcade/batch-clustering-engine/batch-clustering-engine.component';
import { BatchDecayMetricAnalyzerComponent } from './tools/engine/arcade/batch-decay-metric-analyzer/batch-decay-metric-analyzer.component';
import { BatchSystemEvoComponent } from './tools/engine/arcade/batch-system-evo/batch-system-evo.component';
import { PkgsWithSmellDetectionComponent } from './tools/engine/arcade/pkgs-with-smell-detection/pkgs-with-smell-detection.component';
import { PipeExtractorComponent } from './tools/engine/arcade/pipe-extractor/pipe-extractor.component';

import { 
  AuthGuardService as AuthGuard 
} from './auth-guard.service';


const routes: Routes = [
  //-------------Home page ------------------------
  { path: '', redirectTo: '/aboutsain', pathMatch: 'full' },
  { path: 'aboutsain', component:AboutSainComponent , canActivate: [AuthGuard] },
  //-------------Account ---------------------------
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  //-------------Datasets---------------------------
  { path: 'dataset', component: DatasetComponent ,canActivate: [AuthGuard]},
  { path: 'dataset/new', component: NewDatasetComponent ,canActivate: [AuthGuard] },
  { path: 'contactus', component:ContactUsComponent },
  
  //------------Tools routers-----------------------
  { path: 'tools', component:ToolsComponent,canActivate: [AuthGuard] },
  { path: 'tools/add', component:NewToolComponent,canActivate: [AuthGuard] },

  { path: 'tools/Archei', component:ArchiComponent },

  { path: 'tools/Titan', component:TitanComponent,canActivate: [AuthGuard],children:[
         { path:'hdsm',component:HDSMComponent},
         { path:'sdsm',component:SDSMComponent},
         { path:'bugspace',component:BugSpaceComponent},
         { path:'rootcover',component:RootCoverComponent}

    ] 
  },
  
  { path: 'tools/Arcade', component:ArcadeComponent,canActivate: [AuthGuard],children:[
    { path:'AcdcWithSmellDetection',component:AcdcWithSmellDetectionComponent},
    { path:'BatchClusteringEngine',component:BatchClusteringEngineComponent},
    { path:'BatchDecayMetricAnalyzer',component:BatchDecayMetricAnalyzerComponent},
    { path:'BatchSystemEvo',component:BatchSystemEvoComponent},
    { path:'PkgsWithSmellDetection',component:PkgsWithSmellDetectionComponent},
    { path:'PipeExtractor',component:PipeExtractorComponent}
    ] 
  },
  
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
