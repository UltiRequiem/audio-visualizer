import {Component, createRef, RefObject} from 'preact';

export interface AudioVisualiserProps {
	audioData: Uint8Array;
	classes?: string;
}

export class AudioVisualiser extends Component<AudioVisualiserProps> {
	public canvas: RefObject<HTMLCanvasElement>;

	constructor(props: AudioVisualiserProps) {
		super(props);

		this.canvas = createRef();
	}

	componentDidUpdate() {
		this.draw();
	}

	draw() {
		const {audioData} = this.props;

		const canvas = this.canvas.current!;

		const {height, width} = canvas;

		const context = canvas.getContext('2d')!;

		let x = 0;

		const sliceWidth = Number(width) / audioData.length;

		context.lineWidth = 2;
		context.strokeStyle = '#000000';
		context.clearRect(0, 0, width, height);

		context.beginPath();
		context.moveTo(0, height / 2);

		for (const item of audioData) {
			const y = (item / 255) * height;
			context.lineTo(x, y);
			x += sliceWidth;
		}

		context.lineTo(x, height / 2);
		context.stroke();
	}

	render() {
		return (
			<canvas
				class={this.props.classes}
				width='300'
				height='300'
				ref={this.canvas}
			/>
		);
	}
}
