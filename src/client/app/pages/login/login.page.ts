import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from './../../services';
import { IUserLogin } from './../../interfaces';

declare let messager: any;

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class LoginPage implements OnInit {

  public loading: boolean;
  public user: IUserLogin;
  private isLogin: boolean;
  private returnUrl: string;
  //private subscribers: Array<any> = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthenticateService) {
  }

  ngOnInit() {
    this.loading = false;
    this.user = {
      username: '',
      password: '',
      rememberMe: false
    };
    let paramSub = this._route.params.subscribe(param => {
      this.returnUrl = param['returnUrl'] || '/';
    });
  }

  ngOnDestroy() {
  }

  login(form: any) {
    if (form.invalid)
      return;
    this.loading = true;
    this._authService.login(this.user)
      .then(data => {
        messager.success(`Hi! ${data.NickName}, 欢迎回来!`);
        this._router.navigateByUrl(this.returnUrl);
      })
      .catch(err =>{
        this.loading = false;
        messager.error(err);
      })
  }
}
