import React from 'react';
import Game from './src/Game';

class App extends React.Component {

    state = {
        gameId: 1,
    }

    resetGame = () => {
        this.setState(curr => {
            return { gameId: (curr.gameId + 1) % 3 }
        })
    }

    render() {
        return <Game
            key={this.state.gameId}
            gameId={this.state.gameId}
            randomNumCount={6}
            timeLimit={10}
            onPlayAgain={this.resetGame}
        />
    }
}

export default App;