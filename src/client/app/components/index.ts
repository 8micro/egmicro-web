import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import {VideoPlayerComponent} from './videoplayer/video_player.component';
import { VideoUploader } from './videouploader/video_uploader.component';

let Components: Array<any> = [
  HeaderComponent,
  FooterComponent,
  SearchComponent,
  VideoPlayerComponent,
  VideoUploader,
]

export {
  HeaderComponent,
  FooterComponent,
  SearchComponent,
  VideoPlayerComponent,
  VideoUploader,
}

export const COMPONENTS = Components;
