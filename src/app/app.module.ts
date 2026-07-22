import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { ExercicesComponent } from './pages/exercices/exercices.component';
import { FamilyComponent } from './pages/family/family.component';
import { JournalComponent } from './pages/journal/journal.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { StatsComponent } from './pages/stats/stats.component';
import { MemorysequenceComponent } from './pages/exercices/memorysequence/memorysequence.component';
import { VisualpatternComponent } from './pages/exercices/visualpattern/visualpattern.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient } from '@angular/common/http';
import { QuickbrainComponent } from './pages/exercices/quickbrain/quickbrain.component';
import { PatternbuilderComponent } from './pages/exercices/patternbuilder/patternbuilder.component';
import { CommonnameComponent } from './pages/exercices/commonname/commonname.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbacktrainingComponent } from './pages/exercices/nbacktraining/nbacktraining.component';
import { ScattergoriesComponent } from './pages/exercices/scattergories/scattergories.component';
import { PopupComponent } from './shared/popup/popup.component';
import { GamesComponent } from './shared/games/games.component';
import { MemorysequencegameComponent } from './shared/games/memorysequencegame/memorysequencegame.component';
import { EmStatCardComponent } from './shared/components/em-stat-card/em-stat-card.component';
import { EmCardComponent } from './shared/components/em-card/em-card.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartCardComponent } from './shared/components/chart-card/chart-card.component';
import { NextExerciceComponent } from './shared/components/next-exercice/next-exercice.component';
import { CrisistimelineComponent } from './shared/components/crisistimeline/crisistimeline.component';
import { TreatmentCardComponent } from './shared/components/treatment-card/treatment-card.component';
import { MedicationHistoryComponent } from './shared/components/medication-history/medication-history.component';
import { ImportantNoteComponent } from './shared/components/important-note/important-note.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    ExercicesComponent,
    FamilyComponent,
    JournalComponent,
    ReportsComponent,
    StatsComponent,
    MemorysequenceComponent,
    MemorysequencegameComponent,
    VisualpatternComponent,
    QuickbrainComponent,
    PatternbuilderComponent,
    CommonnameComponent,
    NbacktrainingComponent,
    ScattergoriesComponent,
    PopupComponent,
    GamesComponent,
    MemorysequencegameComponent,
    DashboardComponent,
    EmStatCardComponent,
    EmCardComponent,
    ChartCardComponent,
    NextExerciceComponent,
    CrisistimelineComponent,
    TreatmentCardComponent,
    MedicationHistoryComponent,
    ImportantNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: provideTranslateHttpLoader({prefix:"./assets/i18n/", suffix:".json"}),
    }),
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ],
  providers: [
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
