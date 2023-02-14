import { View, StyleSheet } from "react-native";

export default function Card(props) {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#eee',
        paddingTop: 22,
    },
})