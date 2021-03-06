import {useEffect, useRef} from 'preact/hooks';

export interface AudioVisualiserProps {
	audioData: Uint8Array;
	classes?: string;
	width?: number;
	lineWidth?: number;
	height?: number;
}

export function AudioVisualiser({
	classes,
	audioData,
	lineWidth = 3,
	width = 300,
	height = 300,
}: AudioVisualiserProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current!;

		const context = canvas.getContext('2d')!;

		const {height, width} = canvas;

		const sliceWidth = width / audioData.length;

		context.lineWidth = lineWidth;
		context.strokeStyle = '#000000';
		context.clearRect(0, 0, width, height);

		context.beginPath();
		context.moveTo(0, height / 2);

		let x = 0;

		for (const item of audioData) {
			const y = (item / 255) * height;
			context.lineTo(x, y);
			x += sliceWidth;
		}

		context.lineTo(x, height / 2);
		context.stroke();
	});

	return (
		<canvas class={classes} width={width} height={height} ref={canvasRef} />
	);
}
