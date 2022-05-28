import { Component, createRef } from "preact";

export interface AudioVisualiserProps {
  audioData: any;
}

export class AudioVisualiser extends Component {
  public canvas: any;

  constructor(props: AudioVisualiser) {
    super(props);
    this.canvas = createRef();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    //@ts-expect-error
    const { audioData } = this.props;

    const canvas = this.canvas.current;

    const height = canvas.height;

    const width = canvas.width;

    const context = canvas.getContext("2d");

    let x = 0;

    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = "#000000";
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);

    for (const item of audioData) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }

    context.lineTo(x, height / 2);
    context.stroke();
  }

  render() {
    return <canvas width="300" height="300" ref={this.canvas} />;
  }
}
