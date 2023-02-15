import { BgMusicContext } from '../context/BgMusicContext';
import { useContext } from 'react';

export const useBgMusicContext = () => {
    const context = useContext(BgMusicContext)
    
    if (!context) throw Error('useBgMusicContext must be used inside an BgMusicContextProvider')
    return context
}