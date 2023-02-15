import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        paddingLeft: 20,
        fontSize: 18,
        borderRadius: 6,
    },
    errorText: {
        // backgroundColor:'pink',
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },
    instructions: {
        paddingVertical: 10,
        marginVertical: 30,
        backgroundColor: '#ddd',
    },
    instructText: {
        color: 'black',
        fontStyle: 'italic',
        paddingLeft: 10,
        marginBottom: 15,
    },
    descText: {
        fontSize: 12,
        fontStyle: 'italic',
        textAlign: 'justify',
        paddingLeft: 10,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        // backgroundColor: 'pink',
    },
    checkbox: {
        marginRight: 14,
        borderColor: '#bbb',
        borderWidth: 1,
    },
    paragraph: {
        flex: 1,
        fontSize: 15,
        textAlign: 'justify',
    },
});