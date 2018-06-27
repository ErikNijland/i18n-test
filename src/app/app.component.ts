import {Component, OnInit} from '@angular/core';
import {TranslateService} from './translate/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  currentDate = new Date();
  pi = Math.PI;
  greeting: string;

  ngOnInit() {
    console.log(this.pi);
    this.greeting = this.translateService.sayHi();
  }
}
