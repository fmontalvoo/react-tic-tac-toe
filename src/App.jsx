import { Component, Fragment } from 'react';

class Square extends Component {

    handleOnSquareClick = (evt) => {
        // Retorna el indice del boton a la funcion handleClick del padre.
        this.props.onSquareClick(evt.target.value);
    }

    render() {
        return (
            <button className="square"
                onClick={this.handleOnSquareClick} >
                {this.props.value}
            </button>
        );
    }
}

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null), // Crear un arreglo con 9 valores nulos.
        }

        this.currentPlayer = '';
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onSquareClick={() => this.handleClick(i)} />;
    }

    handleClick(index) {
        const squares = [...this.state.squares]; // Crea una copia del arreglo.

        if (this.currentPlayer === 'X')
            this.currentPlayer = 'O';
        else
            this.currentPlayer = 'X';

        squares[index] = this.currentPlayer;
        this.setState({ squares: squares });
    }

    render() {
        return (
            <div>
                <div className="status">{`Jugador: ${this.currentPlayer}`}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

const App = _ => (
    <Fragment>
        <Game />
    </Fragment>
);

export default App;