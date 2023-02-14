import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 25,
        paddingBottom: 25,
        justifyContent: 'space-between',
    },
    head: {
        paddingVertical: 18
    },
    footer: {
        // backgroundColor:'pink',
        // alignItems:'center',
    },
    instruction: {
        textAlign: 'center',
        borderWidth: 1,
        fontStyle: 'italic',
        opacity: 0.6
    },
    hidden: {
        opacity: 0,
    },
    target: {
        fontSize: 50,
        backgroundColor: '#aaa',
        textAlign: 'center',
        borderRadius: 10,
    },
    randomContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    status: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    STATUS_PLAYING: {
        backgroundColor: '#bbb'
    },
    STATUS_WON: {
        backgroundColor: 'green'
    },
    STATUS_LOST: {
        backgroundColor: 'red'
    },
    STATUSTEXT_WON: {
        color: 'green'
    },
    STATUSTEXT_LOST: {
        color: 'red'
    },
    gameEndMsg: {
        textAlign: 'center',
        padding: 10,
        color: 'green',
    },
    textRed: {
        color: 'red'
    },
})