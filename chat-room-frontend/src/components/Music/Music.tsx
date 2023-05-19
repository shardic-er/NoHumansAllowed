import React, { useEffect, useRef } from 'react';

interface MusicProps {
    musicSource: string,
    muted:boolean
}

function Music({ musicSource, muted }: MusicProps): React.ReactElement {
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
        <audio
            style={{display:'none'}}
            ref={audioRef}
            src={musicSource}
            muted={muted}
            autoPlay={true}
            controls={true}
            loop />
    );
}

export default Music;
