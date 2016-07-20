/*
  TODO: delegate WebSocket access to a supporting service class
 */

import {Component, Input, ElementRef, ViewChild} from '@angular/core';
import './rxjs-operators';
import {Subject} from "rxjs/Rx";
import {$WebSocket} from './ng2-websocket';
import { HTTP_PROVIDERS } from '@angular/http';
import {PredictionService} from "./service/prediction.service";
import {PredictionResponse} from "./model/prediction-response";

declare var vis: any;

@Component({
  moduleId: module.id,
  selector: 'angular-websockets-demo-app',
  styleUrls: ['angular-websockets-demo.component.css'],
  providers: [PredictionService, HTTP_PROVIDERS],
  templateUrl: 'angular-websockets-demo.component.html',
  directives: []
  //directives: [NeuralNetGraphComponent]
})
export class AngularWebsocketsDemoAppComponent {
  nodes: any;
  errorMessage: string;
  predictionResponse: PredictionResponse;
  @ViewChild('neuralNetGraph') div:ElementRef;

  ws: $WebSocket;
  inputName: String = "XorExample";

  constructor(private predictionService: PredictionService) {
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

  handlePredictButtonClicked() {
    console.log("Predict button clicked");
    this.predictionService.getPredictionResponse()
      .subscribe(
        predictionResponse => {
          this.predictionResponse = predictionResponse;
          this.updateActivationsPrediction(predictionResponse);
        },
        error =>  this.errorMessage = <any>error);

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
    this.nodes = new vis.DataSet(results.nodes);
    //var nodes = new vis.DataSet(results.nodes);
    var edges = new vis.DataSet(results.edges);

    var data = {
      nodes: this.nodes,
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

  updateActivationsPrediction(predictionResp: PredictionResponse) {
    if (predictionResp != null) {
      alert("predictionResp.prediction: " + predictionResp.prediction);
    }
    this.nodes.update([{id:1, label:"Hello"}]);
  }
}
