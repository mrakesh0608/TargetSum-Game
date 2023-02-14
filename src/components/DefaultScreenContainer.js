import { View, StyleSheet } from "react-native";

export default function DefaultScreenContainer(props) {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingVertical: 10,
        // paddingTop: 22,
    },
})