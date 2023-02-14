import { FlatList, StyleSheet, ImageBackground } from "react-native";

import HomeBtn from '../components/HomeBtn';

export default function Home({ navigation }) {

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
        { title: "New Game", navigation: 'Game', cb: NewGameCB },
        { title: "Custom Game", navigation: "Custom Game", cb: CustomGameCB },
    ]

    return (
        <ImageBackground source={require('../../assets/backg.jpg')} style={styles.container}>
            <FlatList
                data={list}
                renderItem={({ item }) =>
                    <HomeBtn title={item.title} onPress={item.cb} />
                }
                contentContainerStyle={styles.flatList}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})