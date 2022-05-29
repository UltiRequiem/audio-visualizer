import {useEffect, useState} from 'preact/hooks';
import {AudioVisualiser} from './audio-visualiser';

export interface AudioAnalyserProps {
	audio: MediaStream;
	classses?: string;
	width?: number;
	height?: number;
}
export function AudioAnalyser({
	width,
	height,
	classses,
	audio,
}: AudioAnalyserProps) {
	const [audioData, setAudioData] = useState(new Uint8Array(0));

	useEffect(() => {
		const audioContext = new AudioContext();
		const analyser = audioContext.createAnalyser();
		const dataArray = new Uint8Array(analyser.frequencyBinCount);
		const source = audioContext.createMediaStreamSource(audio);

		source.connect(analyser);

		let rafId = requestAnimationFrame(function tick() {
			analyser.getByteTimeDomainData(dataArray);
			setAudioData(dataArray);
			rafId = requestAnimationFrame(tick);
		});

		return () => {
			cancelAnimationFrame(rafId);
			analyser.disconnect();
			source.disconnect();
		};
	}, [audioData]);

	return (
		<AudioVisualiser
			width={width}
			height={height}
			classes={classses}
			audioData={audioData}
		/>
	);
}
