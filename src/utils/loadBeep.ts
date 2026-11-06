import templeBells from '../assets/audio/temple-bells.mp3';

export function loadBeep(){
    const audio = new Audio(templeBells);
    audio.load();

    return () => {
        audio.currentTime = 0;
        audio.play();
    }

}
