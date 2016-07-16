//import {Component} from '@angular/core';
//import {Component, OnInit} from '@angular/core';
import {$WebSocket} from './ng2-websocket';
import {Subject} from "rxjs/Rx";
import {Component, Input, ElementRef, ViewChild} from '@angular/core';

declare var vis: any;

//import {NeuralNetGraphComponent} from "./neural-net-graph.component";

@Component({
  moduleId: module.id,
  selector: 'angular-websockets-demo-app',
  styleUrls: ['angular-websockets-demo.component.css'],
  providers: [],
  templateUrl: 'angular-websockets-demo.component.html',
  directives: []
  //directives: [NeuralNetGraphComponent]
})
export class AngularWebsocketsDemoAppComponent {
  @ViewChild('neuralNetGraph') div:ElementRef;

  ws: $WebSocket;
  inputName: String = "MLPClassifierMoon";

  constructor() {
    //TODO: Modify to inject into constructor?
    //this.ws = new $WebSocket("wss://visualneuralnetservice.cfapps.io:4443/counter");
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
        evt => {
          //var count = JSON.parse(evt.data).value;
          //console.log('Got: ' + evt.data);
          console.log('Got: ' + evt.data);
          var jsonObject = JSON.parse(evt.data);

          // Remove quotes from field names
          //var alteredJson = jsonStr.replace(/"(\w+)"\s*:/g, '$1:');

          this.updateNeuralNetGraph(jsonObject);
          //console.log('count: ' + count);
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

  ngAfterViewInit() {
    var results = {
      nodes: [
        {
          id: "0",
          label: "",
          image: 'http://learnjavafx.typepad.com/mle/sigmoid.png'
        },
        {
          id: "2",
          label: "-4.45",
          image: 'http://learnjavafx.typepad.com/mle/sigmoid.png'
        }
      ],
      edges: [
        {
          from: "0",
          to: "2",
          arrows: "to",
          label: "2.6"
        }
      ]
    }

    var nodes = new vis.DataSet(results.nodes);
    var edges = new vis.DataSet(results.edges);

    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
      nodes: {
        borderWidth:1,
        size: 30,
        color: {
          border: '#406897',
          background: '#6AAFFF'
        },
        font:{color:'#000000'},
        shape: 'circularImage',
        shapeProperties: {
          useBorderWithImage:true
        }
      },
      edges: {
        color: 'lightgray',
        font: {color:'#000000', size: 14, align: 'top'}
      },
      layout: {
        improvedLayout: true,
        hierarchical: {
          enabled: true,
          levelSeparation: 150,
          nodeSpacing: 100,
          direction: "LR"
        }
      }
    };
    var network = new vis.Network(this.div.nativeElement, data, options);
  }

  updateNeuralNetGraph(results: any) {
    var nodes = new vis.DataSet(results.nodes);
    var edges = new vis.DataSet(results.edges);

    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
      nodes: {
        borderWidth:1,
        size: 30,
        color: {
          border: '#406897',
          background: '#6AAFFF'
        },
        font:{color:'#000000'},
        shape: 'circularImage',
        shapeProperties: {
          useBorderWithImage:true
        }
      },
      edges: {
        color: 'lightgray',
        font: {
          color:'#000000',
          size: 14,
          align: 'top'
        },
        arrowStrikethrough: false,
        scaling: {
          label: {
            enabled: true
          }
        }
      },
      physics: {
        enabled: false
      },
      layout: {
        improvedLayout: true,
        hierarchical: {
          enabled: true,
          levelSeparation: 300,
          nodeSpacing: 125,
          direction: 'LR',
          sortMethod: 'directed',
          blockShifting: true,
          edgeMinimization: true
        }
      }

    };
    var network = new vis.Network(this.div.nativeElement, data, options);

  }
}
