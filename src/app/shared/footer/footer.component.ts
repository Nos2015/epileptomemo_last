import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateappService } from '../../services/translateapp.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../../services/localstorage.service';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{

  private url = `${environment.apiUrl}`;
  emailForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      Validators.required
    ]),
  });
  titleFooter = "";
  subTitleFooter = "";
  enterEmail = "";
  joinWaitList = "";
  currentlyDev = "";
  email = "";
  errorMessage = "";
  successMessage = "";
  currentLang = "";
  errorSendMessage = "";
  errorSendMessage2= "";
  errorSendMessage3 = "";
  showPopup = false;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 
      "Content-Type": "application/json"}),
  }

  constructor(
      public translate: TranslateappService,
      private elementRef: ElementRef,
      private http: HttpClient,
      public localStorageService:LocalstorageService
  ){

  }

  ngOnInit(): void {
    this.translate.comp$.subscribe(
      () => {
          this.changeLanguage();
      }
    );
    this.changeLanguage();
    this.checkLanguage();
  }

  changeLanguage(){
    //changeLanguage when page is on front
    if(this.elementRef.nativeElement.offsetParent != null) {
      this.translate.translate.get(
        [
          'footer.title',
          'footer.subTitle',
          'enterEmail',
          'joinWaitList',
          'currentlyDev',
          "errorSendMessage",
          "errorSendMessage2",
          "errorSendMessage3",
          "successSendMessage",
        ]
      )
      .subscribe(translations => {
        this.titleFooter = translations['footer.title'];
        this.subTitleFooter = translations['footer.subTitle'];
        this.enterEmail = translations['enterEmail'];
        this.joinWaitList = translations['joinWaitList'];
        this.currentlyDev = translations['currentlyDev'];
        this.errorSendMessage = translations['errorSendMessage'];
        this.errorSendMessage2 = translations['errorSendMessage2'];
        this.errorSendMessage3 = translations['errorSendMessage3'];
        this.successMessage = translations['successSendMessage'];
      });
    }
  }

  isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  checkLanguage(){
    let lang = localStorage.getItem("language");
    if (lang == null || lang == "fr"){
      this.currentLang = "fr";
    }
    else{
      this.currentLang = "en";
    }
  }

  submitEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.email || !regex.test(this.email)) {
      this.errorMessage = this.errorSendMessage;
      this.showPopup = true;
      this.successMessage = "";
      return;

    }

    this.checkLanguage();

    this.http.post(`${this.url}/api/waitlist`, {
      email: this.email,
      source: this.localStorageService.getSourcePage(),
      language: this.currentLang
    }, this.httpOptions).subscribe({
      next: (res: any) => {

        if (res.success) {
          this.successMessage = this.successMessage;
          this.errorMessage = "";
          this.showPopup = true;
          this.email = "";
        } else {
          this.errorMessage = this.errorSendMessage2;
          this.showPopup = true;
        }

      },
      error: () => {
        this.errorMessage = this.errorSendMessage3;
        this.showPopup = true;
      }
    });
  }

  ok(){
    this.showPopup = false;
  }
}

