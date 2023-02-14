import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function Home({ title, onPress }) {

    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text style={styles.btnText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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