import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeClientComponent } from './pages/home-client/home-client.component';
import { ExercicesComponent } from './pages/exercices/exercices.component';
import { JournalComponent } from './pages/journal/journal.component';
import { StatsComponent } from './pages/stats/stats.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { FamilyComponent } from './pages/family/family.component';
import { MemorysequenceComponent } from './pages/exercices/memorysequence/memorysequence.component';
import { VisualpatternComponent } from './pages/exercices/visualpattern/visualpattern.component';
import { QuickbrainComponent } from './pages/exercices/quickbrain/quickbrain.component';
import { PatternbuilderComponent } from './pages/exercices/patternbuilder/patternbuilder.component';
import { CommonnameComponent } from './pages/exercices/commonname/commonname.component';
import { NbacktrainingComponent } from './pages/exercices/nbacktraining/nbacktraining.component';
import { ScattergoriesComponent } from './pages/exercices/scattergories/scattergories.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { NeurologueDashboardComponent } from './pages/neurologue-dashboard/neurologue-dashboard.component';
import { RoleguardService } from './services/roleguard.service';
import { HomeComponent } from './pages/home/home.component';
import { MentionsLegalesComponent } from './shared/mentions-legales/mentions-legales.component';
import { ConfidentialiteComponent } from './shared/confidentialite/confidentialite.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"client", component:HomeClientComponent},
  {path:"landing", component:LandingPageComponent},
  {path:"auth/register/patient", component:AuthComponent},
  {path:"auth/register/neurologue", component:AuthComponent},
  {path:"auth/verify-email", component:VerifyEmailComponent},
  {path:"auth/resend-verification-code", component:VerifyEmailComponent},
  {path:"auth/login/patient", component:AuthComponent},
  {path:"auth/login/neurologue", component:AuthComponent},
  {path: 'patient', canActivate: [ RoleguardService ],data: {role: 'patient'},component: PatientDashboardComponent},
  {path:"neurologue", canActivate: [ RoleguardService ], data: {role: 'neurologue'},component: NeurologueDashboardComponent},
  {path:"exercices", component:ExercicesComponent},
  {path:"exercices/memorysequence", component:MemorysequenceComponent},
  {path:"exercices/visualpattern", component:VisualpatternComponent},
  {path:"exercices/quickbrain", component:QuickbrainComponent},
  {path:"exercices/patternbuilder", component:PatternbuilderComponent},
  {path:"exercices/commonname", component:CommonnameComponent},
  {path:"exercices/nbacktraining", component:NbacktrainingComponent},
  {path:"exercices/scattergories", component:ScattergoriesComponent},
  {path:"journal", component:JournalComponent},
  {path:"stats", component:StatsComponent},
  {path:"reports", component:ReportsComponent},
  {path:"family", component:FamilyComponent},
  {path:"mentions-legales", component:MentionsLegalesComponent},
  {path:"confidentialite", component:ConfidentialiteComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
