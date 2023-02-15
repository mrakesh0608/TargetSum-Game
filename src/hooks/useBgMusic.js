import { Audio } from 'expo-av';
import { useState } from 'react';

const track = require('../../assets/bgMusic.mp3');

export default function useBgMusic() {

    const [sound, setSound] = useState(new Audio.Sound());
    const [props, setProps] = useState({});

    async function create() {

        await sound.loadAsync(track)
        await sound.setIsLoopingAsync(true);

        sound.setOnPlaybackStatusUpdate(val => {
            // console.log('Play', val.isPlaying, 'pos', val.positionMillis);
            setProps(val);
        })
        setSound(sound);
    }

    async function play() {
        // if (!sound._loaded) await create();

        await sound.playAsync();
    };
    async function pause() { await sound.pauseAsync() };
    async function stop() { await sound.stopAsync() };
    // await this.sound.unloadAsync();
    return {
        create, play, stop, pause,
        ...props
    };
}