import React from 'react'
import { useRef, useEffect, useState } from 'react'
import WaveSurfer from 'wavesurfer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay, faPause, faVolumeUp, faVolumeDown
} from '@fortawesome/free-solid-svg-icons';


const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: "gray",
    progressColor: "green",
    cursorColor: 'transparent',
    responsive: true,
    height: 70,
    normalize: true,
    backend: 'WebAudio',
    barWidth: 2,
    barGap: 3,
})
// format time //
function formatTime(seconds) {
    let date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
}


export default function AudioPlayer({ audioFile }) {
    const waveformRef = useRef(null)
    const Wavesurfer = useRef(null)
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [audioFileName, setAudioFileName] = useState("")


    // initialize wavesurfer and setup eventlistner //
    useEffect(() => {
        // create wavesurfer instance with options //
        const options = formWaveSurferOptions(waveformRef.current);
        Wavesurfer.current = WaveSurfer.create(options);

        //  load the audio file //
        Wavesurfer.current.load(audioFile);

        //  when wavesurfer is ready //
        Wavesurfer.current.on('ready', () => {
            setVolume(Wavesurfer.current.getVolume());
            setDuration(Wavesurfer.current.getDuration());
            setAudioFileName(audioFile.split('/').pop())
        });

        // update current time in state as audio plays
        Wavesurfer.current.on('audioprocess', () => {
            setCurrentTime(Wavesurfer.current.getCurrentTime());
        });

        // clean up event listeners and destroy knstance on unmount
        return () => {
            Wavesurfer.current.un('audioprocess');
            Wavesurfer.current.un('ready');
            Wavesurfer.current.destroy();
        };

    }, [audioFile])

    const handlePlayPause = () => {
        setPlaying(!playing);
        Wavesurfer.current.playPause();
    }

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
        Wavesurfer.current.setVolume(newVolume);

    }

    const handleVolumeUp = () => {
        handleVolumeChange(Math.min(volume + 0.1, 1));
    }
    const handleVolumeDown = () => {
        handleVolumeChange(Math.max(volume - 0.1, 0));
    }


    return (
        <>

            <div id='waveform' ref={waveformRef} style={{ width: '100%' }} >

                <div className='controls'>

                    {/* volume down btn */}
                    <button onClick={handleVolumeDown}>
                        <FontAwesomeIcon icon={faVolumeDown} />
                    </button>
                    {/* volume silder */}
                    <input type="range"
                        id='volume'
                        name='volume'
                        min={0}
                        max={1}
                        step='0.05'
                        value={volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))} />

                    {/* volume up btn */}
                    <button onClick={handleVolumeUp}>
                        <FontAwesomeIcon icon={faVolumeUp} />
                    </button>
                </div>
                <div className='audio-info'>
                    <span>
                        Playing: {audioFileName}<br /></span>
                    <span>Duration: {formatTime(duration)} | Current Time: {''}
                        {formatTime(currentTime)} <br />
                    </span>
                    <span > Volume: {Math.round(volume * 100)}%</span>
                </div>

            </div>
            <div className='play-pause-btn'>
                {/* play/pause btn */}
                <button onClick={handlePlayPause}>
                    <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                </button>
            </div>

        </>

    )
}