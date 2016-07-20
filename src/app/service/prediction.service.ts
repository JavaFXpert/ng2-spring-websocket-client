/**
 * Created by jamesweaver on 7/19/16.
 */
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { PredictionResponse }           from '../model/prediction-response';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class PredictionService {
  constructor (private http: Http) {}

  private predictionUrl = 'http://localhost:8080/prediction?values=1,0';  // URL to web API

  getPredictionResponse (): Observable<PredictionResponse> {
    return this.http.get(this.predictionUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    //return body.data || { };
    return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
