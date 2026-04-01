import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExercicesComponent } from './pages/exercices/exercices.component';
import { JournalComponent } from './pages/journal/journal.component';
import { StatsComponent } from './pages/stats/stats.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { FamilyComponent } from './pages/family/family.component';
import { MemorysequenceComponent } from './pages/exercices/memorysequence/memorysequence.component';
import { VisualpatternComponent } from './pages/exercices/visualpattern/visualpattern.component';
import { QuickbrainComponent } from './pages/exercices/quickbrain/quickbrain.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"exercices", component:ExercicesComponent},
  {path:"exercices/memorysequence", component:MemorysequenceComponent},
  {path:"exercices/visualpattern", component:VisualpatternComponent},
  {path:"exercices/quickbrain", component:QuickbrainComponent},
  {path:"journal", component:JournalComponent},
  {path:"stats", component:StatsComponent},
  {path:"reports", component:ReportsComponent},
  {path:"family", component:FamilyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
