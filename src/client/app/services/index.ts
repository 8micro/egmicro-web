import { AuthenticateService } from './authenticate.service';
import { HttpRequestService } from './http-request.service';
import { GlobalLoadingService } from './global-loading.service';
import { VideoPlayerService } from './video-player.service';
import { Logger } from './logger.service';

export * from './authenticate.service';
export * from './http-request.service';
export * from './global-loading.service';
export * from './video-player.service';
export * from './logger.service';

let Services: Array<any> = [
  AuthenticateService,
  HttpRequestService,
  GlobalLoadingService,
  VideoPlayerService,
  Logger,
]

export const SERVICES = Services;
