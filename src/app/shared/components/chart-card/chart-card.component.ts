import { Component } from '@angular/core';
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
export class ChartCardComponent {
  chartOptions: ChartOptions = {
    series: [
      {
        name: 'Crises',
        data: [6, 5, 11, 10, 17, 12, 10, 11, 9, 5, 6, 8]
      }
    ],

    /*chart: {
      type: 'line',
      height: 320,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },*/

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

    /*stroke: {
      curve: 'smooth',
      width: 4
    },*/

    stroke: {
      curve: 'smooth',
      width: 4,
      colors: ['#3478F6']
    },

    //
    fill: {

      type: 'gradient',

      gradient: {

        shadeIntensity: 1,

        opacityFrom: .28,

        opacityTo: .02,

        stops: [0, 90, 100]

      }
    },
    //

    /*markers: {
      size: 5
    },*/

    markers: {

      size: 0,

      hover: {

        size: 7

      }

    },

    /*xaxis: {
      categories: [
        'Mai',
        'Juin',
        'Juil.',
        'Août',
        'Sept.',
        'Oct.',
        'Nov.',
        'Déc.',
        'Janv.',
        'Fév.',
        'Mars',
        'Avr.'
      ]
    },*/

    xaxis: {

    categories: [

      'Jan',

      'Fév',

      'Mars',

      'Avr',

      'Mai',

      'Juin',

      'Juil',

      'Août',

      'Sept',

      'Oct',

      'Nov',

      'Déc'

    ],

    axisBorder: {

      show: false

    },

    axisTicks: {

      show: false

    }

  },

    /*tooltip: {
      enabled: true
    },*/

    tooltip: {

      theme: 'light',

      marker: {

        show: false

      }

    },

    /*grid: {
      borderColor: '#edf2f7'
    }*/
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
