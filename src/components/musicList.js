import React, { useState } from 'react';
import './musicList.css';
import AudioPlayer from './AudioPlayer';
import drumAudio from '../audio/drum.mp3';
import guitarAudio from '../audio/guitar.mp3';
import pianoAudio from '../audio/piano.wav';
import trumpetAudio from '../audio/trumpet.mp3';

export default function MusicList() {
  const [componentInstances, setComponentInstances] = useState([]);

  const playPiano = () => {
    setComponentInstances((prevInstances) => [
      ...prevInstances,
      <AudioPlayer key={prevInstances.length} audioFile={pianoAudio} />,
    ]);
  };

  const playDrum = () => {
    setComponentInstances((prevInstances) => [
      ...prevInstances,
      <AudioPlayer key={prevInstances.length} audioFile={drumAudio} />,
    ]);
  };
  const playGuitar = () => {
    setComponentInstances((prevInstances) => [
      ...prevInstances,
      <AudioPlayer key={prevInstances.length} audioFile={guitarAudio} />,
    ]);
  };
  const playTrumpet = () => {
    setComponentInstances((prevInstances) => [
      ...prevInstances,
      <AudioPlayer key={prevInstances.length} audioFile={trumpetAudio} />,
    ]);
  };

  // Add similar functions for other instruments

  return (
    <div>
      <div className="buttons-list">
        <button id="Piano" className="music-button" onClick={playPiano}>
          Piano
        </button>
        <button id="Drums" className="music-button" onClick={playDrum}>
          Drums
        </button>
        <button id="Guitar" className="music-button" onClick={playGuitar}>
          Guitar
        </button>
        <button id="Trumpet" className="music-button" onClick={playTrumpet}>
          Trumpet
        </button>
      </div>

      {componentInstances.map((component, index) => (
        <div key={index}>{component}</div>
      ))}
    </div>
  );
}
