/**
 * Created by jamesweaver on 7/14/16.
 */
import {Component, Input, ElementRef, ViewChild} from '@angular/core';

declare var vis: any;


@Component({
  //moduleId: module.id,
  selector: 'neural-net-graph',
  styleUrls: ['app/neural-net-graph.component.css'],
  //styleUrls: ['../css/vis.min.css'],
  providers: [],
  templateUrl: 'app/neural-net-graph.component.html',
  directives: []
})
export class NeuralNetGraphComponent {
  @ViewChild('neuralNetGraph') div:ElementRef;

  constructor() {
    var json = '{"nodes":[{"id": "0","label": ""},{"id": "2","label": "-4.45"}],"edges": [{"from": "0","to": "2","arrows": "to","label": "2.6"}]}';
  }

  ngAfterViewInit() {
    var results = {
      nodes: [
          {
            id: "0",
            label: "",
            image: '../image/sigmoid.png'
          },
          {
            id: "2",
            label: "-4.45",
            image: '../image/sigmoid.png'
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
      }
    };
    var network = new vis.Network(this.div.nativeElement, data, options);
  }
}
