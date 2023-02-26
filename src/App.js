import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [turn, setTurn] = useState('X');
  const [cells, setCells] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === '' ||
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === ''
        ) {
          //do nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        }
      });
    }
  };
  const handelClick = (num) => {
    let squares = [...cells];
    if (cells[num] !== '') {
      alert('Already clicked');
      return;
    }
    // if (winner == null) {
    //   for (var i = 0; i <= 8; i++) {
    //     if (squares[i] !== '') {
    //       console.log(squares[i]);
    //       setDraw(true);
    //     }
    //   }
    // }
    if (turn === 'X') {
      squares[num] = 'X';
      setTurn('O');
    } else {
      setTurn('X');
      squares[num] = 'O';
    }
    setCells(squares);
    checkForWinner(squares);
  };
  const Cell = ({ num }) => {
    return <td onClick={() => handelClick(num)}>{cells[num]}</td>;
  };
  const restart = () => {
    setWinner(null);
    setCells(Array(9).fill(''));
  };
  return (
    <div className="container">
      <table>
        Turn : {turn}
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>{' '}
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {winner && (
        <>
          <h3> {winner} is the winner!</h3>
          <button onClick={restart}>Play again</button>
        </>
      )}
      {draw && (
        <>
          <h3> Draw!</h3>
          <button onClick={restart}>Play again</button>
        </>
      )}
    </div>
  );
}
