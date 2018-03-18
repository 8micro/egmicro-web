import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from './../../services';

declare let messager: any;

@Component({
  selector: 'hb-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class HeaderComponent {

  public userData: any = null;
  public loginPassed: boolean = false;

  constructor(
    private _router: Router,
    private _authService: AuthenticateService) {
  }

  ngOnInit() {

    this._authService.islogin()
    .then(data => {
      if (data && data.UserID) {
        this.userData = data;
        this.loginPassed = true;
      } else {
        this.userData = null;
        this.loginPassed = false;
      }
    })
    .catch(err => {
      messager.error(err);
    });
  }

  logout() {
    this.loginPassed = false;
    this.userData = null;
    this._authService.logout()
      .then(res => {
        this._router.navigate(['/login']);
      })
      .catch(err => {
        messager.error(err);
      });
  }
}
