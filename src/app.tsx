import {useState} from 'preact/hooks';
import {AudioAnalyser, Footer, GetMicrophoneInput} from './components';

export function App() {
	const [microphone, setMicrophone] = useState<MediaStream>();

	const getMicrophone = async () => {
		const audio = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false,
		});

		setMicrophone(audio);
	};

	const stopMicrophone = () => {
		for (const track of microphone!.getAudioTracks()) {
			track.stop();
		}

		setMicrophone(undefined);
	};

	const toggleMicrophone = () => {
		microphone ? stopMicrophone() : getMicrophone();
	};

	return (
		<main class='bg-green-300 min-h-screen flex flex-col items-center p-10'>
			<h1 class='text-3xl underline m-3'>Audio Visualizer</h1>

			<GetMicrophoneInput onClick={toggleMicrophone} microphone={microphone} />

			<section>
				{microphone && (
					<AudioAnalyser
						classses='bg-green-400 rounded-3xl m-5'
						audio={microphone}
					/>
				)}
			</section>

			<section class='bg-green-400 p-4 rounded-xl m-1'>
				<Footer />
			</section>
		</main>
	);
}
