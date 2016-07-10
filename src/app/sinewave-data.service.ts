import {ReplaySubject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';

@Injectable()
export class SineWaveDataService {

  observableSineWave(increment: number, period: number) : ReplaySubject<string> {
      let subject = new ReplaySubject<string>(1);
      let ws = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port, 'hello');
      alert("ws.url: " + ws.url);
      console.log("ws.url: " + ws.url)
      ws.onmessage = function(e: MessageEvent) {
          return subject.next(e.data)
      };
      return subject;
  }
}
