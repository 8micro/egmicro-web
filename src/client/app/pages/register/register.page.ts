import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from './../../services';
import { IUserAuth } from './../../interfaces';

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./base.css', 'layout.css']
})

export class RegisterPage implements OnInit {

  public loading: boolean;
  registalab: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthenticateService) {
  }

  ngOnInit() {
    this.loading = false;
    this.registalab = "reg";
    $('#step1').removeClass('hide');
  }

  register(form: any) {
    if (form.invalid)
      return;

    console.log(form);
  }
}
