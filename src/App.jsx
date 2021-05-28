import { Component, Fragment } from 'react';


function calculateWinner(squares) {
    // Almacena las posiciones en el tablero para declarar al ganador.
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // Verifica que la primer posicion no sea nula. Luego verifica si el resto
        // de posiciones estan ocupadas por el mismo juagor.
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a]; // Devuelve 'X' o 'O' dependiendo el jugador que gane.
        }
    }
    return null;
}

/***********************************************************************************************/

function Square(props) {
    const handleOnSquareClick = (evt) => {
        // Retorna el indice del boton a la funcion handleClick del padre.
        props.onSquareClick(evt.target.value);
    }

    return (
        <button className="square"
            onClick={handleOnSquareClick} >
            {props.value}
        </button>
    );
}

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null), // Crear un arreglo con 9 valores nulos.
            xIsnext: true, // Comprueba el turno del jugador.
        }
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onSquareClick={() => this.handleClick(i)} />;
    }

    handleClick(index) {
        const squares = [...this.state.squares]; // Crea una copia del arreglo.

        // Previene de marcar una casilla si un jugador ya gano.
        // Tambien impide sobreescribir una casilla ocupada.
        if (calculateWinner(squares) || squares[index]) return;

        squares[index] = this.state.xIsnext ? 'X' : 'O';
        this.setState({ squares: squares, xIsnext: !this.state.xIsnext });
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner)
            status = `Gano: ${winner}`;
        else
            status = `Siguiente turno: ${this.state.xIsnext ? 'X' : 'O'}`;
        return (
            <div>
                <div className="status">{status}</div>
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