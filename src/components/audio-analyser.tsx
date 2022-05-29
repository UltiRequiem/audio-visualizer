import {Component} from 'preact';
import {AudioVisualiser} from './audio-visualiser';

export interface AudioAnalyserProps {
	audio: MediaStream;
	classses?: string;
	width?: number;
	height?: number;
}

export interface AudioAnalyserState {
	audioData: Uint8Array;
}

export class AudioAnalyser extends Component<AudioAnalyserProps, AudioAnalyserState> {
	public audioContext?: AudioContext;
	public analyser?: AnalyserNode;
	public dataArray?: Uint8Array;
	public source?: MediaStreamAudioSourceNode;
	public rafId?: number;

	constructor(props: AudioAnalyserProps) {
		super(props);

		this.state = {audioData: new Uint8Array(0)};

		this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		this.audioContext = new AudioContext();
		this.analyser = this.audioContext.createAnalyser();
		this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
		this.source = this.audioContext.createMediaStreamSource(this.props.audio);
		this.source.connect(this.analyser);
		this.rafId = requestAnimationFrame(this.tick);
	}

	tick() {
		this.analyser!.getByteTimeDomainData(this.dataArray!);
		this.setState({audioData: this.dataArray});
		this.rafId = requestAnimationFrame(this.tick);
	}

	componentWillUnmount() {
		cancelAnimationFrame(this.rafId!);
		this.analyser!.disconnect();
		this.source!.disconnect();
	}

	render() {
		return (
			<AudioVisualiser
				width={this.props.width}
				height={this.props.height}
				classes={this.props.classses}
				audioData={this.state.audioData}
			/>
		);
	}
}
