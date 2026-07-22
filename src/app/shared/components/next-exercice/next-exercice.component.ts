import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-exercice',
  standalone: false,
  templateUrl: './next-exercice.component.html',
  styleUrl: './next-exercice.component.scss'
})
export class NextExerciceComponent implements OnInit{
    @Input() icon = '';
    @Input() iconSecond = '';
    @Input() iconSecondHover = '';
    currentUrl = '';
    pathIconSecond='';
    pathIconSecondHover='';

    constructor(private router: Router) {}

    ngOnInit(): void {
      this.currentUrl = this.router.url;
      if(this.iconSecond!=''){
        this.pathIconSecond = this.currentUrl+"/assets/"+this.iconSecond+".png";
      }
      if(this.iconSecondHover!=''){
        this.pathIconSecondHover = this.currentUrl+"/assets/"+this.iconSecondHover+".png";
      }
    }
}
