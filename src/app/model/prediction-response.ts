/**
 * Created by jamesweaver on 7/19/16.
 */
export class PredictionResponse {
  constructor(
    public prediction: number,
    public activations: number[],
    public numOutputNodes: number
  )
  {}
}
