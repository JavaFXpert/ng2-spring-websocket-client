import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { AngularWebsocketsDemoAppComponent } from '../app/angular-websockets-demo.component';

beforeEachProviders(() => [AngularWebsocketsDemoAppComponent]);

describe('App: AngularWebsocketsDemo', () => {
  it('should create the app',
      inject([AngularWebsocketsDemoAppComponent], (app: AngularWebsocketsDemoAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'angular-websockets-demo works!\'',
      inject([AngularWebsocketsDemoAppComponent], (app: AngularWebsocketsDemoAppComponent) => {
  }));
});
