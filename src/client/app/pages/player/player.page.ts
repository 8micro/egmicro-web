import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService, VideoPlayerService } from './../../services';
import { VideoPlayerComponent } from '../../components/videoplayer/video_player.component';
import { Logger } from  '../../services/logger.service';



declare let messager: any;

@Component({
  selector: 'player',
  templateUrl: './player.html',
  styleUrls: ['./player.css']
})

export class PlayerPage implements OnInit {

  
  _testVideolist: any[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _videoService:  VideoPlayerService,
    private _logger: Logger) {
      this._testVideolist = ['1', '2', '3'];
  }

  ngOnInit() {
    this._logger.log("player page ngOnInit");

    this._videoService.getAllVideo().then( videoList =>{
      this._logger.log("get all video result is :");
      this._logger.log(videoList);
    }

    ).catch( 
      err => {
      }
    );
  
  
  }

  ngOnDestroy() {
    
  }

}
