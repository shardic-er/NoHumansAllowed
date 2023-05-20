import React, { useEffect, useRef } from 'react';
import {MusicProps} from '../../Utils/Interfaces'

// function takes in a MusicProps (aka string) named musicSource and returns a React Element
function Music({ musicSource, muted }: MusicProps): React.ReactElement {

    // useRef is a react hook that takes a DOM element (indicated by the ref prop in the element itself)
    // and returns an object (audioRef) whose .current prop gets set to the passed argument (null).
    // Then you can change the properties of the object without re-rendering the component.
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // This is called when the value of musicSource changes.
    useEffect(() => {
        // It takes the current values of the element it references
        const audio = audioRef.current;
        if (audio instanceof HTMLAudioElement) {
            audio.src = musicSource;
            audio.volume = 0.1;
            // Plays audio and assigns the promise it returns a variable name
            const playPromise: Promise<void> | undefined = audio.play();
 
            // audio.play is an asynchronous function that returns a promise because of the way the browser handles audio
            // If play was called synchronously (like autoplay) it would return undefined, which is what this checks for. This 
            // It isn't called synchronously here, but chatGPT said it was good practice to ensure it is a promise
            if (playPromise !== undefined) {
                playPromise
                    // Reports back on success or failure
                    // The _ is convention that you are aren't using the return value
                    .then((_ : unknown) => {
                        // playback started!
                    })
                    // error is a built-in object type
                    .catch((error: Error) => {
                        // displays an error if the play failed
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
