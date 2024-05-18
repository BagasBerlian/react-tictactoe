/* eslint-disable react/prop-types */
import { useState } from "react";

const audio = new Audio("/audio/bg-audio.mp3");

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // Jika square[i] sudah terisi maka jangan diganti value nya
    if (squares[i] || calculateWinner(squares)) return;

    // Membuat array baru yang sama persis dengan array square
    const nextSquare = squares.slice();

    nextSquare[i] = xIsNext ? "X" : "O";

    onPlay(nextSquare);
    // console.log(nextSquare);
  }

  const winner = calculateWinner(squares);
  // Cek Apakah board sudah penuh
  const isBoardFull = squares.every((square) => square !== null);

  let status = "";
  if (winner) {
    status = "Winner: " + winner;
  } else if (isBoardFull) {
    status = "Game Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Nav() {
  const [isPlaying, setIsPlaying] = useState(false);

  function playAudio() {
    if (!isPlaying) {
      audio.volume = 0.2;
      audio.play();
    } else {
      audio.pause();
    }

    setIsPlaying(!isPlaying);
  }

  return (
    <nav>
      <h1>Tic Tac Toe</h1>
      <img onClick={playAudio} id="iconPlay" src={isPlaying ? "/img/volume_off.svg" : "/img/volume_up.svg"} alt="Volume icon" />
    </nav>
  );
}

export default function Game() {
  const [history, SetHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;

  // Keadaan sekarang
  const currentSquare = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    SetHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // move akan sebanyak array yang didalam history
  const moves = history.map((squares, move) => {
    let description = move > 0 ? "Go to move #" + move : "Reset Game";

    return (
      <li className="history" key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <Nav />
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  // kemungkinan menang
  const lines = [
    // Kemungkinan menang secara horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // kemungkinan menang secara vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // kemungkinan menang secara diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return false;
}
