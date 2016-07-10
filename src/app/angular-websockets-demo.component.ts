import {Component, OnInit} from '@angular/core';
import {Input} from '@angular/core';
import {SineWaveDataService} from './sinewave-data.service';
import {$WebSocket} from './ng2-websocket';
import {Subject} from "rxjs/Rx";

@Component({
  moduleId: module.id,
  selector: 'angular-websockets-demo-app',
  styleUrls: ['angular-websockets-demo.component.css'],
  providers: [],
  templateUrl: 'angular-websockets-demo.component.html',
  directives: []
})
export class AngularWebsocketsDemoAppComponent {
  ws: $WebSocket;
  inputName: String = "Fred";

  constructor() {
    //TODO: Modify to inject into constructor?
    this.ws = new $WebSocket("ws://localhost:8080/counter");
  }

  handleConnectButtonClicked() {
    var subject: Subject<any>;

    console.log("Connect button clicked");

    this.ws.connect(false);

    console.log("ws.getReadyState(): " + this.ws.getReadyState());

    subject = this.ws.getDataStream();

    if (subject.observers == null || subject.observers.length == 0) {
      subject.subscribe(
        res => {
          var count = JSON.parse(res.data).value;
          //console.log('Got: ' + res.data);
          console.log('Got: ' + res.data);
          console.log('count: ' + count);
          //this.counter = count;
        },
        function (e) {
          console.log('Error: ' + e.message);
        },
        function () {
          console.log('Completed!');
        }
      );
    }
  }

  handleUnsubscribeButtonClicked() {
    console.log("Unsubscribe button clicked");
    console.log("ws.getReadyState(): " + this.ws.getReadyState());

    this.ws.getDataStream().unsubscribe();
  }

  handleDisconnectButtonClicked() {
    console.log("Disconnect button clicked");
    console.log("ws.getReadyState(): " + this.ws.getReadyState());

    this.ws.close(true);
  }

  handleSendButtonClicked() {
    console.log("Send button clicked");
    console.log("ws.getReadyState(): " + this.ws.getReadyState());

    //let name = "James";

    //this.ws.send(JSON.stringify({ 'name': name }));
    this.ws.send(JSON.stringify({ 'name': this.inputName }));

  }

}
