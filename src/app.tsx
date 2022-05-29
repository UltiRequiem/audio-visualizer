import {useState} from 'preact/hooks';
import {AudioAnalyser, Footer, GetMicrophoneInput} from './components';

export function App() {
	const [microphone, setMicrophone] = useState<MediaStream>();

	const getMic = async () => {
		const audio = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false,
		});

		setMicrophone(audio);
	};

	const stopMic = () => {
		for (const track of microphone!.getAudioTracks()) {
			track.stop();
		}

		setMicrophone(undefined);
	};

	const toggleMic = () => {
		microphone ? stopMic() : getMic();
	};

	return (
		<main class='bg-green-300 min-h-screen flex flex-col items-center p-6'>
			<h1 class='text-3xl underline m-3'>Audio Visualizer</h1>

			<GetMicrophoneInput onClick={toggleMic} microphone={microphone} />

			<section class='bg-blue-400 rounded-3xl m-2 min-h-[350px] min-w-[350px]'>
				{microphone && (
					<AudioAnalyser
						classses='bg-green-500 m-5 rounded-3xl'
						width={310}
						height={310}
						audio={microphone}
					/>
				)}
			</section>

			<section class='bg-green-400 p-4 rounded-xl m-1 text-center'>
				<Footer />
			</section>
		</main>
	);
}
