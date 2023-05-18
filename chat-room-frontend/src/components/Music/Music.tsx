import React, { useState, useEffect } from 'react';
import SampleMusic from '../../../../Docs/Music/sampleMusic.mp3';
import comeBack from '../../../../Docs/Music/comeBack.mp3';
//components/source/chatroomfrontend/nohumansallowed

function Music(): JSX.Element {
    const [musicSource, setMusicSource] = useState<string>(SampleMusic);
    
    const handleMusicSourceChange = () => {
        setMusicSource(comeBack):
    }

    //event listener that calls the handler

    return (
        <audio src={musicSource} autoPlay controls />
    )
}

export default Music;