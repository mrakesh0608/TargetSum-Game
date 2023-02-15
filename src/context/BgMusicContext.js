import { createContext, useEffect, useReducer, useState } from 'react'
import { Audio } from 'expo-av';

const track = require('../../assets/bgMusic.mp3');

export const BgMusicContext = createContext();

export const BgMusicReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROPS':
            state.bgMusic.title = `Music ${action.payload.isPlaying ? 'On' : 'Off'}`;
            state.bgMusic.isPlaying = action.payload.isPlaying;
            return { ...state }; //never return state by mutating bcoz it took me 2 hours to figure out, by rakesh :) 
        default:
            return state
    }
}
export const BgMusicContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(BgMusicReducer, {
        bgMusic: {
            title: 'Music Off',
            onPress: MusicCB,
            isPlaying: false,
        }
    })

    const [sound, setSound] = useState(new Audio.Sound());

    async function create() {

        await sound.loadAsync(track)
        await sound.setIsLoopingAsync(true);

        sound.setOnPlaybackStatusUpdate(val => {
            // console.log('changes');
            if (val.isPlaying !== state.bgMusic?.isPlaying) dispatch({ type: 'SET_PROPS', payload: { ...val } });
            // console.log(val);
            // console.log(state);
            // console.log('Play', val.isPlaying, 'pos', val.positionMillis);
        })
        setSound(sound);
    }

    async function play() {
        if (!sound._loaded) await create();
        await sound.playAsync();
    };

    async function pause() { await sound.pauseAsync() };
    async function stop() { await sound.stopAsync() };
    async function unload() { await sound.unloadAsync() };

    async function MusicCB() {
        if (state.bgMusic?.isPlaying) await pause();
        else await play();
    }

    async function init() {
        await create();
        await play();
    }
    useEffect(() => {
        init();
    }, [])
    // console.log('BgMusicContext state:', state)

    return (
        <BgMusicContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BgMusicContext.Provider>
    )
}