import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { Router } from '@angular/router'

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
    constructor(
        
    ) {

    }

    ngOnInit() {
        this.videoType_ = 'video/mp4';
        this.videoPreload_ = "auto";
        this.videoWidth_ = 0;
        this.videoHeight_ = 0;
        this.videoUrl = "";
    }

    @Input()
    private set videoUrl(url : string) {
        this.videoUrl_ = url;
    }

    @Input()
    private set videoWidth( width : number) {
        this.videoWidth_ = width;
    }

    @Input()
    private set videoHeight(height : number) {
        this.videoHeight_ = height;
    }

    @Input()
    private set videoId(id : string) {
        this.videoId_ = id;
    }


}