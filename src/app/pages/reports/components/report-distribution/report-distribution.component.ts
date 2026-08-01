import { Component, ElementRef, OnInit } from '@angular/core';
import { ChartOptions } from '../../../../shared/components/chart-card/chart-card.component';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexResponsive
} from 'ng-apexcharts';
import { TranslateappService } from '../../../../services/translateapp.service';

@Component({
  selector: 'app-report-distribution',
  standalone: false,
  templateUrl: './report-distribution.component.html',
  styleUrl: './report-distribution.component.scss'
})

export class ReportDistributionComponent implements OnInit{
  public series: ApexNonAxisChartSeries = [55, 25, 15, 5];

  public chart: ApexChart = {
    type: 'donut',
    height: 248
  };

  typeSeizure="";

  labelsFinal:string[]=[];

  labels=[
    'Focales',
    'Absences',
    'Généralisées',
    'Autres'
  ];

  labelsEn=[
    'Focal',
    'Absence',
    'Generalized',
    'Other'
  ];

  public legend: ApexLegend = {
    position: 'bottom'
  };

  public responsive: ApexResponsive[] = [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 240
        }
      }
    }
  ];

  constructor(
            public translate: TranslateappService,
            private elementRef: ElementRef,
  ){}

  ngOnInit(): void {
    this.translate.comp$.subscribe(
      () => {
          this.changeLanguage();
      }
    );
    this.changeLanguage();
  }

  changeLanguage(){
    //changeLanguage when page is on front
    if(this.elementRef.nativeElement.offsetParent != null) {
      this.translate.translate.get(
        [
          'pages.reports.distribution.typeSeizure',
        ]
      )
      .subscribe(translations => {
        this.typeSeizure = translations['pages.reports.distribution.typeSeizure'];
      });
    }

    if(this.translate.getLanguageUsed() == "fr"){
      console.log("french");
      this.labelsFinal = this.labels;
    }
    else{
      console.log("english");
      this.labelsFinal = this.labelsEn;
    }
  }
}
