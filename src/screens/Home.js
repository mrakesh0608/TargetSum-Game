import { FlatList, StyleSheet, ImageBackground } from "react-native";

import HomeBtn from '../components/HomeBtn'
import { windowHeight } from "../util";
import { useBgMusicContext } from '../hooks/useBgMusicContext';

export default function Home({ navigation }) {

    const { bgMusic } = useBgMusicContext();

    function NewGameCB() {
        navigation.navigate('Game', {
            randomNumCount: 6,
            timeLimit: 10,
            minKeyNum: 1,
            maxKeyNum: 10,
        })
    }

    function CustomGameCB() { navigation.navigate('Custom Game') }

    const list = [
        {
            title: "New Game",
            navigation: 'Game',
            onPress: NewGameCB
        },
        {
            title: "Custom Game",
            navigation: "Custom Game",
            onPress: CustomGameCB
        },
        {
            title: bgMusic.title,
            onPress: bgMusic.onPress
        },
    ]

    return (
        <ImageBackground source={require('../../assets/backg.gif')} style={styles.container} >
            <FlatList
                data={list}
                renderItem={({ item }) =>
                    <HomeBtn title={item.title} onPress={item.onPress} />
                }
                contentContainerStyle={styles.flatList}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',

    },
    flatList: {
        // backgroundColor: 'red',
        alignItems: 'center',
        marginBottom: Math.floor(windowHeight * 0.14),
    },
})