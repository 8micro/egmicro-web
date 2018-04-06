import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Logger } from  '../../services/logger.service';
import { VideoUploader } from '../../components/videouploader/video_uploader.component';
import {IVideoUploaderData} from '../../interfaces/videouploader.interface';




@Component({
  selector: 'videouploader',
  templateUrl: './video_uploader_page.html',
  styleUrls: ['./video_uploader_page.css']
})


export class VideoUploaderPage implements OnInit {

    private _videoUploaderData: IVideoUploaderData;

    constructor(private _logger: Logger) {
        this._logger.log("VideoUploaderPage constructor");
    }

    ngOnInit(){
        this._videoUploaderData = {
            videoTitle: '默认标题',
            videoDesc: '默认视频介绍',
            videoFile: '默认视频'
        };
    }

    uploadVideo(form:any) {
        if(!form.invalid) {
            this._logger.log('填写的视频信息格式校验失败');
            return;
        }
    }
}