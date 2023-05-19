import { useEffect, useRef } from 'react';

//components/source/chatroomfrontend/nohumansallowed
interface MusicProps {
    musicSource: string;
}

function Music({musicSource}: MusicProps): JSX.Element {

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = musicSource;
            audioRef.current.volume = 0.1;
            audioRef.current.play();
        }
    }, [musicSource]);

    return (
        // remove controls later.
        <audio ref={audioRef} src={musicSource} autoPlay controls loop />
    )
}

export default Music;