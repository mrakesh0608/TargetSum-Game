import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        paddingTop: 30,
    },
    instruction: {
        textAlign: 'center',
        borderWidth: 1,
        marginHorizontal: 50,
    },
    hidden: {
        opacity: 0,
    },
    target: {
        fontSize: 50,
        backgroundColor: '#aaa',
        textAlign: 'center',
        margin: 50,
        borderRadius: 10
    },
    randomContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        // backgroundColor:'blue',
        marginVertical: 10,
    },
    status: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around'
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
    gameEndMsg:{
        textAlign:'center',
        paddingBottom:10,
        color:'green',
    },
    textRed:{
        color:'red'
    }
})