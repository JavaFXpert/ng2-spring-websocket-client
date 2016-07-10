import {Component, Input, ElementRef, OnInit,
        ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {NgFor} from '@angular/common';
import {ReplaySubject} from 'rxjs/Rx';

@Component({
  selector: 'printer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>Data</h3>
    <table>
    <tr *ngFor="let item of data">
        <td>{{ item }}</td>
    </tr>
    </table>
`
})
export class Printer implements OnInit {
  @Input() id: string;
  @Input() width: number;
  @Input() height: number;
  @Input() incomingData: ReplaySubject<string>;
  data: Array<number>;
  static MAX_DATA: number = 10;

  constructor(private detector: ChangeDetectorRef) {
    this.data = [];
  }

  ngOnInit() {
    this.incomingData.subscribe(
        (dataPoint) => {
            this.data.push(JSON.parse(dataPoint).value);
            if (this.data.length > 10) {
                //this.data.pop();
            }
            this.detector.detectChanges();
        },
        (error) => {
            alert(`Error occurred ${error}`);
        });
  }
}
