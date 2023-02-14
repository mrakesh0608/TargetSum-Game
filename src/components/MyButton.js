import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export default function MyButton({ text, onPress, disabled }) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={disabled && styles.disabled}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.6,
    },
    button: {
        borderRadius: 8,
        backgroundColor: '#f01d71',
        paddingHorizontal: 10,
        paddingVertical: 14,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
})