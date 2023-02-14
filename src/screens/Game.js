import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Button } from "react-native";

import RandomNumber from '../components/RandomNumber';

export default class Game extends React.Component {

    randomNum = Array.from({ length: this.props.randomNumCount }).map(
        () => 1 + Math.floor(10 * Math.random())
    )

    target = this.randomNum.slice(0, this.props.randomNumCount - 2).reduce(
        (acc, curr) => acc + curr, 0
    )

    shuffledRandomNum = this.randomNum.sort(() => 0.5 - Math.random());

    state = {
        gameStatus: 'PLAYING',
        remainingSec: this.props.timeLimit,
        selectedIds: [],
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState(
                (curr) => {
                    return { remainingSec: curr.remainingSec - 1 };
                },
                () => {
                    if (this.state.remainingSec === 0) clearInterval(this.intervalId);
                }
            )
        }, 1000)
    }

    componentWillUnmount() { clearInterval(this.intervalId) }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.gameStatus === 'PLAYING' &&
            (this.state.remainingSec === 0 || prevState.selectedIds !== this.state.selectedIds)
        ) this.setState(curr => ({
            gameStatus: this.calcGameStatus()
        }))

        if (this.state.gameStatus !== 'PLAYING') clearInterval(this.intervalId);
    }

    isNumSelected = (numIndex) => this.state.selectedIds.indexOf(numIndex) >= 0;

    selectNum = (numIndex) => {
        this.setState(curr => ({
            selectedIds: [...curr.selectedIds, numIndex]
        }))
    }

    calcGameStatus = () => {
        const sumSelected = this.state.selectedIds.reduce((acc, curr) => acc + this.shuffledRandomNum[curr], 0)
        // console.log(sumSelected);

        if (this.state.remainingSec === 0 || sumSelected > this.target) return 'LOST';
        else if (sumSelected === this.target) return 'WON';
        else if (sumSelected < this.target) return 'PLAYING';
    }

    render() {
        const gameStatus = this.gameStatus;
        return (
            <View style={styles.container}>
                <View style={styles.status}>
                    <Text>Status : <Text style={styles[`STATUSTEXT_${this.state.gameStatus}`]}>{this.state.gameStatus}</Text></Text>
                    <Text>Time: {this.state.remainingSec}s</Text>
                </View>
                <Text style={[styles.target, styles[`STATUS_${this.state.gameStatus}`]]}>{this.target}</Text>

                <View style={styles.randomContainer}>
                    {this.shuffledRandomNum.map((randomNum, index) =>
                        <RandomNumber
                            key={index} id={index}
                            number={randomNum}
                            isDisabled={this.isNumSelected(index) || this.state.gameStatus !== 'PLAYING'}
                            onPress={this.selectNum}
                        />
                    )}
                </View>
                <Button
                    title={this.state.gameStatus === 'PLAYING' ? 'Reset Game' : 'Play Again'}
                    onPress={this.props.onPlayAgain}
                    color={this.state.gameStatus === 'PLAYING' ? '#bbb' : 'green'}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        paddingTop: 30,
    },
    target: {
        fontSize: 50,
        backgroundColor: '#aaa',
        textAlign: 'center',
        margin: 50,
        borderRadius: 10
    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
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
})

Game.propTypes = {
    gameId: PropTypes.number.isRequired,
    randomNumCount: PropTypes.number.isRequired,
    timeLimit: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
}