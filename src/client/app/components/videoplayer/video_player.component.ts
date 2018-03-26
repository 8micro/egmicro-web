import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { Logger } from '../../services/logger.service'

@Component ({
    selector : 'hb-videoplayer',
    templateUrl : './video_player.html',
    styleUrls : ['./video_player.css']
})


export class VideoPlayerComponent implements   OnInit {
    public userData : any = null;
    protected videoUrl_ : string;
    protected videoWidth_ : number;
    protected videoHeight_ :  number;
    protected videoId_ : string;
    protected videoType_ : string;
    protected videoPreload_ : string;
    protected videoTitle_: string;
    protected preLoad_: string;
    protected videoDesc_:string;

    constructor(
        private _logger:Logger
    ) {

    }

    ngOnInit() {
        this.preLoad_ = "auto";
        this.videoDesc_ = "这是视频的内容简单介绍...";
    }

    //http://120.78.156.20:8086/video/video_output/playlist.m3u8
    @Input()
    private set videoUrl(url : string) {
        this._logger.log('set url: ' + url);
        this.videoUrl_ = url;
    }

    @Input()
    private set videoWidth( width : number) {
        this._logger.log('set width: ' + width);
        this.videoWidth_ = width;
    }

    @Input()
    private set videoHeight(height : number) {
        this._logger.log('set videoHeight: ' + height);
        this.videoHeight_ = height;
    }

    @Input()
    private set videoId(videoId : string) {
        this._logger.log('set videoId: ' + videoId);
        this.videoId_ = videoId;
    }
    @Input()
    private set videoTitle (title: string) {
        this._logger.log('set title: ' + title);
        this.videoTitle_ = title;
    }

    @Input()
    private set videoType(type:string) {
        this._logger.log('set videoType: ' + type);
        this.videoType_ = type;
    }

}