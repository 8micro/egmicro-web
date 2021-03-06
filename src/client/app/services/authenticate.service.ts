import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpRequestService } from './http-request.service';
import { IUserAuth } from './../interfaces';

declare let messager: any;

@Injectable()
export class AuthenticateService {

  private userData: any = null;

  constructor(
    private _router: Router,
    private _http: HttpRequestService) {
  }

  login(userAuth: IUserAuth): Promise<any> {
    return new Promise((resolve, reject) => {
      this.clearUserData();
      this._http.post('/api/users/login', userAuth, { disableLoading: true })
        .then(res => {
          this.userData = res.json();
          resolve(this.userData);
        })
        .catch(err => {
          reject(err.json ? err.json() : err);
        });
    });
  }

  islogin(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.userData) {
        return resolve(this.userData);
      }
      this._http.get(`/api/users/islogin`)
        .then(res => {
          let result = res.json();
          if (!result.isLogin) {
            return resolve({});
          }
          this.userData = result.userData;
          resolve(this.userData);
        })
        .catch(err => {
          reject(err.json ? err.json() : err);
        });
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.clearUserData();
      this._http.get('/api/users/logout', { disableLoading: true })
        .then(res => {
          resolve(true);
        })
        .catch(err => {
          reject(err.json ? err.json() : err);
        });
      });
    }

    getUserData(): any {
      return this.userData;
    }

    clearUserData() {
      this.userData = null;
    }
}

