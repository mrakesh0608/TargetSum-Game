import { View, FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";

import DefaultScreenContainer from '../components/DefaultScreenContainer'

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
        <DefaultScreenContainer>
            <View style={styles.container}>
                <FlatList
                    data={list}
                    renderItem={({ item }) =>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={item.cb}>
                                <Text style={styles.btnText}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    contentContainerStyle={styles.flatList}
                />
            </View>
        </DefaultScreenContainer>
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
    btnContainer: {
        margin: 20,
    },
    btn: {
        backgroundColor: "#1e90ff",
        padding: 15,
        borderRadius: 10,
    },
    btnText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        width: 150,
    }
})