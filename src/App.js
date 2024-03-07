import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import MusicList from "./components/musicList";
import Time from "./components/time";
import AudioFile from "./audio/audio.mp3";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <div className="profile">
        <h1 className="name">Camba.ai</h1>
        <Time />
        <MusicList />
      </div>
    </div>
  );
}

export default App;
