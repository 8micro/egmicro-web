import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService, VideoPlayerService } from './../../services';
import { VideoPlayerComponent } from '../../components/videoplayer/video_player.component';
import { Logger } from  '../../services/logger.service';
import { IVideoJSConfig } from './../../interfaces/videoplayer.interface';



declare let messager: any;

@Component({
  selector: 'player',
  templateUrl: './player.html',
  styleUrls: ['./player.css']
})




export class PlayerPage implements OnInit {

  

  private _testVideolist: IVideoJSConfig[];

  private video1:IVideoJSConfig;
  private video2:IVideoJSConfig;
  private video3:IVideoJSConfig;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _videoService:  VideoPlayerService,
    private _logger: Logger) {
      _logger.log('PlayerPage constructor');

       this.video1 = {
        height : 150,
        id: 'video1',
        width: 800 ,
        url: 'http://120.78.156.20:8086/video/video_output/playlist.m3u8',
        type: 'application/x-mpegURL',
        title: '测试视频1'
      };
     

      this.video2 = {
        height : 150,
        id: 'video2',
        width: 800,
        url: 'http://120.78.156.20:8086/video/video_output/playlist.m3u8',
        type: 'application/x-mpegURL',
        title: '测试视频2'
      };
      
      this.video3 = {
        height : 150,
        id: 'video3',
        width: 800,
        url: 'http://120.78.156.20:8086/video/video_output/playlist.m3u8',
        type: 'application/x-mpegURL',
        title: '测试视频3'
      };

      //let video4 = new IVideoJSConfig();

      
      this._testVideolist = [this.video1,this.video2, this.video3];
      
  }

  ngOnInit() {
    this._logger.log("player page ngOnInit");


   /* this._videoService.getAllVideo().then( videoList =>{
      this._logger.log("get all video result is :");
      this._logger.log(videoList);
    }

    ).catch( 
      err => {
      }
    ); */
  
  
  }

  ngOnDestroy() {
    this._logger.log("player page ngOnDestroy");
  }

}
