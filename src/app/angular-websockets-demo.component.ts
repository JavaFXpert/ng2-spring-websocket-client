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
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
//import {FORM_DIRECTIVES} from '@angular/forms';
//import {MD_RADIO_DIRECTIVES} from '@angular2-material/radio/radio';

declare var vis: any;

@Component({
  moduleId: module.id,
  selector: 'angular-websockets-demo-app',
  styleUrls: ['angular-websockets-demo.component.css'],
  providers: [PredictionService, HTTP_PROVIDERS],
  templateUrl: 'angular-websockets-demo.component.html',
  directives: [MD_BUTTON_DIRECTIVES, MD_TOOLBAR_DIRECTIVES] //, MD_RADIO_DIRECTIVES,FORM_DIRECTIVES]
  //directives: [NeuralNetGraphComponent]
})
export class AngularWebsocketsDemoAppComponent {
  network: any;
  graph2d: any;
  nodes: any;
  edges: any;
  errorMessage: string;
  predictionResponse: PredictionResponse;
  //numInputs: number;
  inputValues: string[] = [];
  inputFeatureNames: string[] = [];
  @ViewChild('neuralNetGraph') div:ElementRef;
  @ViewChild('scoreGraph') scoreGraph:ElementRef;

  ws: $WebSocket;
  curSampleName: String = "";

  constructor(private predictionService: PredictionService) {
    //TODO: Modify to inject into constructor?
    //this.ws = new $WebSocket("wss://visualneuralnetservice.cfapps.io:4443/counter");
    this.ws = new $WebSocket("ws://localhost:8080/counter");
  }

  connectToWebSocket() {
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

          this.updateNeuralNetGraph(jsonObject);

          // TODO: Uncomment when Vis Graph2d works in this environment
          //this.updateScoreGraph(jsonObject);
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

  /*
  handleSendButtonClicked() {
    console.log("Send button clicked");
    console.log("ws.getReadyState(): " + this.ws.getReadyState());

    //let name = "James";

    //this.ws.send(JSON.stringify({ 'name': name }));
    this.ws.send(JSON.stringify({ 'name': this.inputName }));
  }
  */

  handleSampleButtonClicked(sampleName: string) {
    console.log("Sample button clicked: " + sampleName);
    console.log("ws.getReadyState(): " + this.ws.getReadyState());
    this.curSampleName = sampleName;

    //let name = "James";

    //this.ws.send(JSON.stringify({ 'name': name }));
    this.ws.send(JSON.stringify({ 'name': sampleName }));
  }

  handlePredictButtonClicked() {
    console.log("Predict button clicked, inputValues: " + this.inputValues);
    this.predictionService.getPredictionResponse(this.inputValues)
      .subscribe(
        predictionResponse => {
          this.predictionResponse = predictionResponse;
          this.updateActivationsPrediction(predictionResponse);
        },
        error =>  this.errorMessage = <any>error);

  }

  ngAfterViewInit() {
    this.connectToWebSocket();
  }

  updateNeuralNetGraph(results: any) {
    // Make note of the number of inputs TODO: perhaps remove this and the numInputs member variable
    //this.numInputs = results.neuralNetLayerList[0].neuralNetNodeList.length;

    // Create an array element for each input
    this.inputValues = [];
    this.inputFeatureNames = [];
    for (var inputIdx in results.neuralNetLayerList[0].neuralNetNodeList) {
      //console.log("inputIdx: " + inputIdx);
      var neuralNode = results.neuralNetLayerList[0].neuralNetNodeList[inputIdx];
      if (neuralNode != undefined) {
        this.inputFeatureNames.push(neuralNode.name);
      }
      this.inputValues.push("");
    }

    this.nodes = new vis.DataSet(results.nodes);
    this.edges = new vis.DataSet(results.edges);

    var data = {
      nodes: this.nodes,
      edges: this.edges
    };
    this.network = new vis.Network(this.div.nativeElement, data, this.createGraphOptions());

  }

  updateActivationsPrediction(predictionResp: PredictionResponse) {
    if (predictionResp != null) {
      //alert("predictionResp.prediction: " + predictionResp.prediction);
    }

    var numInputs = this.inputFeatureNames.length;
    var nodeLabel: string = "";
    for (let nodeId in predictionResp.activations) {
      nodeLabel = this.createNodeLabel(predictionResp.activations[nodeId] + ((predictionResp.inputsNormalized && Number(nodeId) < numInputs) ? "n" : ""));
      this.nodes.update([{id: nodeId, image: nodeLabel, shape: 'circularImage', borderWidth: "1"}]);

      // Put wider border around predicted label
      if (Number(nodeId) == predictionResp.activations.length - predictionResp.numOutputNodes + predictionResp.prediction) {
        this.nodes.update([{id: nodeId, borderWidth: "5"}]);
      }
    }
    this.network.setOptions(this.createGraphOptions());
  }

  createNodeLabel(label: String) {
    var data = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">' +
      '<rect x="0" y="0" width="100%" height="100%" fill="#ffffff" ></rect>' +
      '<foreignObject x="10" y="11" width="100%" height="100%">' +
      '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:6px">' +
      '<span style="color:black;">' + label +
      '</span>' +
      '</div>' +
      '</foreignObject>' +
      '</svg>';


    var DOMURL = window.URL;

    var img = new Image();
    var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svg);

    return url;
  }

  createGraphOptions() {
    var graphOptions = {
      nodes: {
        borderWidth:1,
        size: 40,
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
    return graphOptions;
  }

  // TODO: Work out this functionality
  updateScoreGraph(results: any) {
    var items = [];

    var dataset = new vis.DataSet(items);
    var options = {};
    this.graph2d = new vis.Graph2d(this.div.nativeElement, dataset, options);
  }
}
