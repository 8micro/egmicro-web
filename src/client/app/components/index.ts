import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import {VideoPlayerComponent} from './videoplayer/video_player.component';

let Components: Array<any> = [
  HeaderComponent,
  FooterComponent,
  SearchComponent,
  VideoPlayerComponent,
]

export {
  HeaderComponent,
  FooterComponent,
  SearchComponent,
  VideoPlayerComponent,
}

export const COMPONENTS = Components;
