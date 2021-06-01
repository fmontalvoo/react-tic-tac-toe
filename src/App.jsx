import { Component, Fragment } from 'react';


/**
 * Chequea cual es el ganador del juego.
 * 
 * @param {*} squares 
 * @returns 
 */
function calculateWinner(squares) {
    // Almacena las posiciones en el tablero para declarar al ganador.
    const winningPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winningPositions.length; i++) {
        const [a, b, c] = winningPositions[i];
        // Verifica que la primer posicion no sea nula. Luego verifica si el resto
        // de posiciones estan ocupadas por el mismo juagor.
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a]; // Devuelve 'X' o 'O' dependiendo el jugador que gane.
        }
    }
    return null;
}

/***********************************************************************************************/

/**
 * Se encarga de mostrar cada uno de los recuadros del tablero.
 * 
 * @param {*} props 
 * @returns 
 */
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

/**
 * Dibuja el tablero y asigna posiciones a los recuadros en el mismo.
 * 
 * @param {*} props 
 * @returns 
 */
function Board(props) {
    const renderSquare = (i) => (
        <Square
            value={props.squares[i]}
            onSquareClick={() => props.onSquareClick(i)} />);

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );

}

/**
 * Se encarga de mostrar todo el juego, manejar el estado y redibujar todo
 * el contenido del juego.
 */
class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            history: [{// history: Guardara todas las jugadas que se han realizado en el juego.
                squares: Array(9).fill(null), // Crear un arreglo con 9 valores nulos.
            }],
            xIsnext: true, // Comprueba el turno del jugador.
            stepNumber: 0, // Indica la jugada actual que es visible.
        };
    }

    /**
     * Maneja el evento 'clic' del juego. Esta al tanto de cuando un recuadro es clicado.
     * 
     * @param {*} index 
     * @returns 
     */
    handleClick = (index) => {
        // Crea una copia del historial hasta el movimiento actual mas uno.
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]; // Muestra el movimiento actual.
        const squares = [...current.squares]; // Crea una copia del tablero en el movimiento actual.

        // Previene de marcar una casilla si un jugador ya gano.
        // Tambien impide sobreescribir una casilla ocupada.
        if (calculateWinner(squares) || squares[index]) return;

        // Indica a que jugador corresponde el siguiente movimiento.
        squares[index] = this.state.xIsnext ? 'X' : 'O';
        this.setState({
            history: history.concat({ squares: squares }), // Concatena el nuevo arreglo de squares al historial.
            stepNumber: history.length, // Actualiza el numero de movimiento.
            xIsnext: !this.state.xIsnext // Actualiza el turno del jugador.
        });
    }

    /**
     * Muestra la jugada y el tablero en un determinado movimiento.
     * 
     * @param {*} index 
     */
    jumpToMove(index) {
        this.setState({ stepNumber: index, xIsnext: ((index % 2) === 0) });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner)
            status = `Gano: ${winner}`;
        else
            status = `Siguiente turno: ${this.state.xIsnext ? 'X' : 'O'}`;

        // Crea un listado con todos los movimientos que se han jugado.
        const moves = history.map((_, step) => {
            const desc = step
                ? `Regresar al movimiento #${step}`
                : 'Reiniciar';
            return (
                <li key={step}>
                    <button onClick={() => this.jumpToMove(step)}>{desc}</button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onSquareClick={this.handleClick} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
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