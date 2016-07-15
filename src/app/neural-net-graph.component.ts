/**
 * Created by jamesweaver on 7/14/16.
 */
import {Component, Input, ElementRef, ViewChild} from '@angular/core';

declare var vis: any;


@Component({
  //moduleId: module.id,
  selector: 'neural-net-graph',
  //styleUrls: ['neural-net-graph.css'],
  providers: [],
  //templateUrl: 'neural-net-graph.component.html',
  template: `
      <h1>Hello</h1>
      <input #myname  value="John Doe">
      <div #neuralNetGraph></div>
      <h1>Good bye</h1>
`,
  directives: []
})
export class NeuralNetGraphComponent {
  @ViewChild('myname') input:ElementRef;
  @ViewChild('neuralNetGraph') div:ElementRef;

  constructor() {
    //alert("Hi!!");
    var json = '{"nodes":[{"id": "0","label": ""},{"id": "2","label": "-4.45"}],"edges": [{"from": "0","to": "2","arrows": "to","label": "2.6"}]}';
    //var container = document.getElementById('neuralNetGraph');
    //var data = {
    //  nodes: nodes,
    //  edges: edges
    //};
  }

  ngAfterViewInit() {
    //var nodes = new vis.DataSet('[{"id": "0","label": ""},{"id": "2","label": "-4.45"}]');
    //var edges = new vis.DataSet('[{"from": "0","to": "2","arrows": "to","label": "2.6"}]');
    //var nodes = new vis.DataSet([{id: "0", label: "Zero"}, {id: "2", label: "Two"}]);
    //var edges = new vis.DataSet([{from: "0", to: "2", arrows: "to", label: "2.6"}]);

    var nodes = new vis.DataSet([
      {id: 1, label: 'Node 1'},
      {id: 2, label: 'Node 2'},
      {id: 3, label: 'Node 3'},
      {id: 4, label: 'Node 4'},
      {id: 5, label: 'Node 5'}
    ]);

    var edges = new vis.DataSet([
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]);

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
        font: {color:'#000000', size: 8, align: 'top'}
      }
    };
    var network = new vis.Network(this.div.nativeElement, data, options);
    //this.input.nativeElement.innerHTML = "<h3>Inserted</h3>";
    console.log(this.input.nativeElement.value);
    this.input.nativeElement.value = "Barney";
    //this.div.nativeElement.innerHTML = "Wilma";
  }
}
