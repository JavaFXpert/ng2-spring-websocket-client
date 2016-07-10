import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AngularWebsocketsDemoAppComponent} from './app/angular-websockets-demo.component';
import { environment } from './app/environment';

if (environment.production) {
  enableProdMode();
}

bootstrap(AngularWebsocketsDemoAppComponent);
