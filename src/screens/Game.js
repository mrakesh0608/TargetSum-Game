import React from 'react';

import GameInit from '../components/InitGame';

export default class Game extends React.Component {

    gameProp = this.props.route.params;

    state = { gameId: 1 }

    //change gameid to re-render the GameInit Component
    resetGame = () => this.setState(curr => ({ gameId: (curr.gameId + 1) % 3 }));

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
        />
    }
}