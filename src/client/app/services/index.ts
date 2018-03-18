import { AuthenticateService } from './authenticate.service';
import { HttpRequestService } from './http-request.service';
import { GlobalLoadingService } from './global-loading.service';

export * from './authenticate.service';
export * from './http-request.service';
export * from './global-loading.service';

let Services: Array<any> = [
  AuthenticateService,
  HttpRequestService,
  GlobalLoadingService
]

export const SERVICES = Services;
