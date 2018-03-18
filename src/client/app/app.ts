import { Component, OnInit } from "@angular/core";
import { Angulartics2GoogleAnalytics } from 'angulartics2';
//import { AuthService } from './services';

@Component({
  selector: 'egmicro-app',
  template: `
    <router-outlet></router-outlet>
  `
})

export class EgMicroApp {
  constructor(
    /*
    private authService: AuthService,*/
    private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
  }

  ngOnInit() {

  }
}
