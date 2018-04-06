import { Injectable } from '@angular/core';
import {  Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalLoadingService } from './global-loading.service';
import { HttpRequestService } from './http-request.service';
import { IVideoJSConfig } from '../interfaces/videoplayer.interface';
import { Logger } from './logger.service';

@Injectable()
export class VideoPlayerService {
    constructor(
        private _router: Router,
        private _http: HttpRequestService,
        private _globalLoading: GlobalLoadingService, 
        private _logger: Logger) {
        
    }

    private videoList: Array<IVideoJSConfig>;
    public getAllVideo() : Promise<any> {
        return new Promise((resolve, reject) => {
            this._logger.log("start to request video list for user");
            this._http.post('api/users/getuservideo', '')
            .then(res => {
                this.videoList = res.json();
                resolve(this.videoList);
            })
            .catch(err => {
                this._logger.log('start to request video list for user failed');
                let video1: IVideoJSConfig;
                video1.height = 200;
                video1.id = 'video1';
                video1.url = '';
                reject(err.json ? err.json(): err);
            })
            ;
        });

    }

}