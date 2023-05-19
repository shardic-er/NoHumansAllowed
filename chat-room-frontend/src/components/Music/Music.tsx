import React, { useEffect, useRef } from 'react';

interface MusicProps {
    musicSource: string;
}

function Music({ musicSource }: MusicProps): React.ReactElement {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio instanceof HTMLAudioElement) {
            audio.src = musicSource;
            audio.volume = 0.1;
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(_ => {
                        // Automatic playback started!
                    })
                    .catch(error => {
                        // Auto-play was prevented
                        console.log(error);
                    });
            }
        }
    }, [musicSource]);



    return (
        <audio ref={audioRef} src={musicSource} autoPlay controls loop />
    );
}

export default Music;
