import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { Logger } from '../../services/logger.service'
import { FineUploader } from 'fine-uploader'


@Component ({
    selector : 'hb-videoUploader',
    templateUrl : './video_uploader.html',
    styleUrls : ['./video_uploader.css']
})


export class VideoUploader implements   OnInit {

    private uploadUrl_:string;
    private uploadUserId_:string;
    private templateName_:string;
    private elementId_:string;
    private debugFlag_:boolean;
    private waiting_png_:string;
    private not_available_png_:string;
    private videoSupported_:any;


    constructor(private _logger: Logger) {

    }

    ngOnInit() {
        this.uploadUrl_ = 'http://120.78.156.20:8087/upload';
        this.uploadUserId_ = "testuserid";
        this.templateName_ = 'qq-template-gallery';
        this.elementId_ = 'fine-uploader-gallery';
        this.debugFlag_ = true;
        this.waiting_png_ = 'static/js/video_upload_client_js/placeholders/waiting-generic.png';
        this.not_available_png_ = 'static/js/video_upload_client_js/placeholders/not_available-generic.png';
        this.videoSupported_ = ['mp4'];
        let uploader = new FineUploader({
            element: document.getElementById(this.elementId_),
            template: this.templateName_,
            request: {
                endpoint: this.uploadUrl_,
				params : {
					userid:this.uploadUserId_
				}
            },
            thumbnails: {
                placeholders: {
                    waitingPath: this.waiting_png_,
                    notAvailablePath: this.not_available_png_
                },
            },
            validation: {
                allowedExtensions: this.videoSupported_,
				sizeLimit: 80000000
            }
        });

        //let header1: string = Access-Control-Allow-Origin;

        uploader.setCustomHeaders({'crossDomain':true});
        
    }

}