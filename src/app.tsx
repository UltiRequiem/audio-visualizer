import { useState } from "preact/hooks";
import { AudioAnalyser } from "./components";

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
    microphone?.getAudioTracks().forEach((track) => track.stop());
    setMicrophone(undefined);
  };

  const toggleMicrophone = () => {
    microphone ? stopMicrophone() : getMicrophone();
  };

  return (
    <div className="App">
      <div className="controls">
        <button onClick={toggleMicrophone}>
          {microphone ? "Stop microphone" : "Get microphone input"}
        </button>
      </div>
      {microphone ? <AudioAnalyser audio={microphone} /> : ""}
    </div>
  );
}
