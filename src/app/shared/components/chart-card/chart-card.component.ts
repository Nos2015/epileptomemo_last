import { Component, ElementRef, OnInit } from '@angular/core';
import { ApexYAxis } from 'apexcharts';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexMarkers,
  ApexTooltip,
  ApexGrid,
  ApexFill,
  ApexDataLabels
} from 'ng-apexcharts';
import { TranslateappService } from '../../../services/translateapp.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  markers: ApexMarkers;
  tooltip: ApexTooltip;
  fill: ApexFill;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss',
  standalone:false,
})
export class ChartCardComponent  implements OnInit{

  evolutionCrisis = "";
  evolutionCrisisToolTip = "";
  categoriesCalendar = [];
  lastDays = "";
  lastMonth = "";

  chartOptions: ChartOptions = {
    series: [
      {
        name: 'Crises',
        data: [6, 5, 11, 10, 17, 12, 10, 11, 9, 5, 6, 8]
      }
    ],
    chart: {
      type: 'area',
      height: 340,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      animations: {
        enabled: true,
        speed: 900
      }
    },
    stroke: {
      curve: 'smooth',
      width: 4,
      colors: ['#3478F6']
    },

    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: .28,
        opacityTo: .02,
        stops: [0, 90, 100]
      }
    },
    markers: {
      size: 0,
      hover: {
        size: 7
      }
    },
    xaxis: {
      categories: this.categoriesCalendar,

      axisBorder: {
        show: false
      },

      axisTicks: {
        show: false
      }
  },
   tooltip: {
      theme: 'light',
      marker: {
        show: false
      }
    },

   grid: {
      borderColor: '#EDF2F7',
      strokeDashArray: 6,
      xaxis: {
        lines: {
          show: false
        }
      }
    },

    dataLabels: {
      enabled: false
    },

    yaxis: {
      min: 0,
      max: 20,
      tickAmount: 4
    },
  };

  selectedPeriod = '365';

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
          'pages.journal.dashboard.chart-card.evolutionCrisis',
          'pages.journal.dashboard.chart-card.evolutionCrisisToolTip',
          'pages.journal.dashboard.chart-card.categoriesCalendar',
          'pages.journal.dashboard.chart-card.lastDays',
          'pages.journal.dashboard.chart-card.lastMonths',
        ]
      )
      .subscribe(translations => {
        this.evolutionCrisis = translations['pages.journal.dashboard.chart-card.evolutionCrisis'];
        this.evolutionCrisisToolTip = translations['pages.journal.dashboard.chart-card.evolutionCrisisToolTip'];
        this.lastDays = translations['pages.journal.dashboard.chart-card.lastDays'];
        this.lastMonth = translations['pages.journal.dashboard.chart-card.lastMonths'];
        let categories  = translations['pages.journal.dashboard.chart-card.categoriesCalendar'];
        this.chartOptions.xaxis = {
              categories: categories,
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              }
        }
      });

    }
  }
  
  onPeriodChanged() {

    switch (this.selectedPeriod) {

        case '7':
          this.loadWeek();
          break;

        case '30':
          this.loadMonth();
          break;

        case '90':
          this.loadQuarter();
          break;

        case '180':
          this.loadSemester();
          break;

        default:
          this.loadYear();
    }
  }


  loadWeek(){

  }

  loadMonth(){
    
  }

  loadQuarter(){
    
  }

  loadSemester(){
    
  }

  loadYear(){
    
  }
}
