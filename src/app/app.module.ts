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
    VisualpatternComponent,
    QuickbrainComponent,
    PatternbuilderComponent,
    CommonnameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: provideTranslateHttpLoader({prefix:"./assets/i18n/", suffix:".json"}),
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
