import { View, Text, Button, ScrollView } from "react-native";
import React from 'react';
import PropTypes from 'prop-types';

import { randomNumBetween, haptic } from '../util';

import RandomNumber from './RandomNumber';
import styles from '../styles/InitGame';

export default class InitGame extends React.Component {

    randomNum = Array.from({ length: this.props.randomNumCount }).map(
        () => ({
            num: randomNumBetween(this.props.minKeyNum, this.props.maxKeyNum),
            isSolNum: false
        })
    )

    target = this.randomNum.slice(0, randomNumBetween(2, this.props.randomNumCount))
        .reduce((acc, curr) => {
            curr.isSolNum = true;
            return acc + curr.num;
        }, 0)

    shuffledRandomNum = this.randomNum.sort(() => 0.5 - Math.random());

    state = {
        gameStatus: 'PLAYING',
        remainingSec: this.props.timeLimit,
        selectedIds: [],

        gameEndMsg: '',
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
        ) this.setState(curr => this.calcGameStatus());

        if (this.state.gameStatus !== 'PLAYING') clearInterval(this.intervalId);
    }
    isNumSelected = (numIndex) => this.state.selectedIds.indexOf(numIndex) >= 0;

    selectNum = (numIndex) => {
        this.setState(curr => ({
            selectedIds: [...curr.selectedIds, numIndex]
        }))
    }

    calcGameStatus = () => {
        const sumSelected = this.state.selectedIds.reduce((acc, curr) => acc + this.shuffledRandomNum[curr].num, 0)
        // console.log(sumSelected);

        if (this.state.remainingSec === 0) {
            haptic('Heavy');
            return { gameStatus: 'LOST', gameEndMsg: 'Time Limit Exceeded !!' };
        }
        if (sumSelected > this.target) {
            haptic('Warning');
            return { gameStatus: 'LOST', gameEndMsg: 'Sum Exceeded !!' };
        }
        else if (sumSelected === this.target) {
            haptic('Heavy');
            return { gameStatus: 'WON', gameEndMsg: 'You Won !!' };
        }
        else if (sumSelected < this.target) return { gameStatus: 'PLAYING', gameEndMsg: '' };
    }

    render() {
        const gameStatus = this.state.gameStatus;

        return (
            <ScrollView contentContainerStyle={styles.container}>

                <Text style={[
                    styles.instruction,
                    gameStatus === 'PLAYING' && styles.hidden,
                ]}>Note : May have more than 1 solution</Text>

                <View style={styles.status}>
                    <Text>Status : <Text style={styles[`STATUSTEXT_${gameStatus}`]}>{gameStatus}</Text></Text>
                    <Text>Time: <Text style={this.state.remainingSec < 4 && styles.STATUSTEXT_LOST}>{this.state.remainingSec}s</Text></Text>
                </View>

                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>

                <ScrollView contentContainerStyle={styles.randomContainer}>
                    {this.shuffledRandomNum.map((randomNum, index) =>
                        <RandomNumber
                            key={index} id={index}
                            number={randomNum.num}
                            isDisabled={this.isNumSelected(index) || gameStatus !== 'PLAYING'}
                            onPress={this.selectNum}
                            isAns={gameStatus === 'PLAYING' ? false : randomNum.isSolNum}
                        />
                    )}
                </ScrollView>

                <Text style={[
                    styles.gameEndMsg,
                    gameStatus === 'LOST' && styles.textRed,
                    gameStatus === 'PLAYING' && styles.hidden,
                ]}>{this.state.gameEndMsg}</Text>

                <Button
                    title={gameStatus === 'PLAYING' ? 'Reset Game' : 'Play Again'}
                    onPress={this.props.onPlayAgain}
                    color={gameStatus === 'PLAYING' ? '#bbb' : 'green'}
                />
            </ScrollView >
        )
    }
}

InitGame.propTypes = {
    gameId: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,

    randomNumCount: PropTypes.number.isRequired,
    minKeyNum: PropTypes.number.isRequired,

    timeLimit: PropTypes.number.isRequired,
    maxKeyNum: PropTypes.number.isRequired,
}