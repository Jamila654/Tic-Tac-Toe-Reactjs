import React, { useState, useEffect } from "react";

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [ties, setTies] = useState(0);

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      if (winner === "X") setXScore((prev) => prev + 1);
      if (winner === "O") setOScore((prev) => prev + 1);
      setTimeout(resetGame, 1000);
    } else if (!board.includes(null)) {
      setTies((prev) => prev + 1);
      setTimeout(resetGame, 1000);
    } else if (!isXNext) {
      setTimeout(() => makeComputerMove(), 500);
    }
  }, [board, isXNext]);

  const makeComputerMove = () => {
    const bestMove = findBestMove(board);
    if (bestMove !== undefined) {
      handleClick(bestMove);
    }
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const resetScores = () => {
    setXScore(0);
    setOScore(0);
    setTies(0);
    resetGame();
  };

  const calculateWinner = (board) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const findBestMove = (board) => {
    const emptyIndices = board
      .map((value, index) => (value === null ? index : null))
      .filter((val) => val !== null);

    for (let i = 0; i < emptyIndices.length; i++) {
      const newBoard = [...board];
      newBoard[emptyIndices[i]] = "O";
      if (calculateWinner(newBoard) === "O") return emptyIndices[i];
    }

    for (let i = 0; i < emptyIndices.length; i++) {
      const newBoard = [...board];
      newBoard[emptyIndices[i]] = "X";
      if (calculateWinner(newBoard) === "X") return emptyIndices[i];
    }

    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  return (
    <div className="bg-[#101a13] w-[90%] md:w-[50%] lg:w-[30%] min-h-screen p-4 md:p-4 flex flex-col justify-around">
      <div className="flex justify-around">
        <div className="flex">
          <img
            src="./x.png"
            alt="X"
            className={`w-5 md:w-10 py-1 sm:py-0 cursor-pointer ${
              !isXNext ? "opacity-50" : ""
            }`}
          />
          <img
            src="./circle.png"
            alt="O"
            className={`w-5 md:w-10 py-2 sm:py0 cursor-pointer ${
              isXNext ? "opacity-50" : ""
            }`}
          />
        </div>
        <button className="bg-[#194d29] text-white font-bold border-2 flex items-center justify-center shadow-lg shadow-black border-black h-10 w-[100px] p-2 rounded-lg text-nowrap hover:opacity-45">
          {isXNext ? "X Turn" : "O Turn"}
        </button>
        <button onClick={resetScores}>
          <img
            src="./reset.png"
            alt="Reset"
            className="w-7 md:w-10 bg-slate-600 rounded-md cursor-pointer"
          />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 self-center">
        {board.map((value, index) => (
          <button
            key={index}
            className="bg-[#194d29] w-16 h-16 rounded-xl hover:opacity-55"
            onClick={() => handleClick(index)}
          >
            {value && (
              <img
                src={`./${value === "X" ? "x" : "circle"}.png`}
                alt={value}
                className="w-full h-full"
              />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-around">
        <button className="bg-white w-24 flex flex-col items-center justify-center shadow-lg shadow-black rounded-lg hover:opacity-55">
          <h1>Player X</h1>
          <h3>{xScore}</h3>
        </button>
        <button className="bg-slate-600 w-24 flex flex-col items-center justify-center shadow-lg shadow-black rounded-lg hover:opacity-55">
          <h1>Ties</h1>
          <h3>{ties}</h3>
        </button>
        <button className="bg-[#194d29] w-24 flex flex-col items-center justify-center shadow-lg shadow-black rounded-lg hover:opacity-55">
          <h1>Player O</h1>
          <h3>{oScore}</h3>
        </button>
      </div>
    </div>
  );
}









