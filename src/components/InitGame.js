import { View, Text, Button, ScrollView, Animated } from "react-native";
import React from 'react';
import PropTypes from 'prop-types';

import { randomNumBetween, haptic, AnimateColor } from '../util';

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

    aniAnsBgColor = new AnimateColor({
        type: 'timing', duration: 1000,
        initialValue: "rgb(170,170,170)", finalValue: "rgb(144, 238, 144)",
    })

    aniTargetBgColor = new AnimateColor({
        type: 'timing', duration: 750,
        initialValue: "rgb(170,170,170)", finalValue: "rgb(255,0,0)",
        startCallBack: () => { this.aniAnsBgColor.doAni() }
    })


    componentDidUpdate(prevProps, prevState) {
        if (this.state.gameStatus === 'PLAYING' &&
            (this.state.remainingSec === 0 || prevState.selectedIds !== this.state.selectedIds)
        ) this.setState(curr => this.calcGameStatus());

        if (this.state.gameStatus !== 'PLAYING') {
            clearInterval(this.intervalId);

            if (this.state.gameStatus === 'WON') this.aniAnsBgColor.doAni();
            else this.aniTargetBgColor.doAni();
        }
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
            return { gameStatus: 'LOST', gameEndMsg: 'Time limit exceeded !!' };
        }
        if (sumSelected > this.target) {
            haptic('Warning');
            return { gameStatus: 'LOST', gameEndMsg: `Sum exceeded by ${sumSelected - this.target}  !!!` };
        }
        else if (sumSelected === this.target) {
            const TAT = this.props.timeLimit - this.state.remainingSec;
            haptic('Heavy');
            return { gameStatus: 'WON', gameEndMsg: `You won within ${TAT} second${TAT > 1 ? 's' : ''}` };
        }
        else if (sumSelected < this.target) return { gameStatus: 'PLAYING', gameEndMsg: '' };
    }

    render() {
        const gameStatus = this.state.gameStatus;

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.head}>
                    <Text style={[
                        styles.instruction,
                        gameStatus === 'PLAYING' && styles.hidden,
                    ]}>Note : May have more than 1 solution</Text>

                    <View style={styles.status}>
                        {!this.props.hideStatus &&
                            <Text style={styles.statusText}>Status : <Text style={styles[`STATUSTEXT_${gameStatus}`]}>{gameStatus}</Text></Text>
                        }
                        {this.props.displayWinnings &&
                            <Text style={styles.statusText}>Winnings : {this.props.numWinnings}</Text>
                        }
                        <Text style={styles.statusText}>Time: <Text style={this.state.remainingSec < 4 && styles.STATUSTEXT_LOST}>{this.state.remainingSec}s</Text></Text>
                    </View>

                    <Animated.Text style={[
                        styles.target,
                        styles[`STATUS_${gameStatus}`],
                        { backgroundColor: this.aniTargetBgColor.eleColor }
                    ]}>{this.target}</Animated.Text>

                </View>

                <View style={styles.randomContainer}>
                    {this.shuffledRandomNum.map((randomNum, index) =>
                        <RandomNumber
                            key={index} id={index}
                            number={randomNum.num}
                            isDisabled={this.isNumSelected(index) || gameStatus !== 'PLAYING'}
                            onPress={this.selectNum}
                            isAns={gameStatus === 'PLAYING' ? false : randomNum.isSolNum}
                            aniBgColor={this.aniAnsBgColor.eleColor}
                        />
                    )}
                </View>
                <View style={styles.footer}>
                    <Text style={[
                        styles.gameEndMsg,
                        gameStatus === 'LOST' && styles.textRed,
                        gameStatus === 'PLAYING' && styles.hidden,
                    ]}>{this.state.gameEndMsg}</Text>

                    <Button
                        title={gameStatus === 'PLAYING' ? 'Reset Game' : 'Play Again'}
                        onPress={() => this.props.onPlayAgain({ gameStatus })}
                        color={gameStatus === 'PLAYING' ? '#bbb' : 'green'}
                    />
                </View>
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