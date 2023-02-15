import React from 'react';

import GameInit from '../components/InitGame';

export default class Game extends React.Component {

    gameProp = this.props.route.params;

    state = {
        gameId: 1,
        numWinnings: 0,
    }

    calcWinnings = ({ gameStatus }) => {
        if (!this.gameProp.displayWinnings) return 0;
        if (gameStatus === 'WON') return this.state.numWinnings + 1;
        return 0;
    }

    //change gameid to re-render the GameInit Component
    resetGame = ({ gameStatus }) => {

        this.setState(curr => ({
            gameId: (curr.gameId + 1) % 3,
            numWinnings: this.calcWinnings({ gameStatus }),
        }));
    }

    render() {
        // console.log(this.gameProp);

        return <GameInit
            key={this.state.gameId}
            gameId={this.state.gameId}

            onPlayAgain={this.resetGame}

            randomNumCount={this.gameProp.randomNumCount}
            timeLimit={this.gameProp.timeLimit}
            maxKeyNum={this.gameProp.maxKeyNum}
            minKeyNum={this.gameProp.minKeyNum}

            displayWinnings={this.gameProp.displayWinnings}
            numWinnings={this.state.numWinnings}

            hideStatus = {this.gameProp.hideStatus}
        />
    }
}