import React, { useState } from "react";

const pieces = new Map([
  ['r', 'bR'], ['n', 'bH'], ['b', 'bB'], ['q', 'bQ'], ['k', 'bK'], ['p', 'bP'],
  ['R', 'wR'], ['N', 'wH'], ['B', 'wB'], ['Q', 'wQ'], ['K', 'wK'], ['P', 'wP']
]);

const parseChessBoardString = (boardString) => {
  if (!boardString) return [];

  const rows = boardString.split(/[0-9]+/);
  const emptySquares = boardString.match(/[0-9]+/g) || [];

  let board = [];

  for (let i = 0; i < rows.length; i++) {
    let row = [...rows[i]];

    if (emptySquares[i]) {
      const emptyCount = parseInt(emptySquares[i], 10);
      for (let j = 0; j < emptyCount; j++) {
        row.push("");
      }
    }

    if (row.length > 8) {
      row = row.slice(0, 8);
    } else {
      while (row.length < 8) {
        row.push("");
      }
    }

    board.push(row);
  }

  while (board.length < 7) {
    board.push(["", "", "", "", "", "", "", ""]);
  }
  board.splice(0, 1);

  return board;
};

function ChessBoard(props) {
  const [from, setFrom] = useState(null);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const board = parseChessBoardString(props.board);
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const colr = !props.white ? { transform: 'rotate(180deg)' } : {};

  return (
    <div style={colr} className="w-full h-full flex flex-col">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="flex flex-1">
          {row.map((piece, colIdx) => {
            const currentSquare = letters[colIdx] + (8 - rowIdx);
            const isLastMove = props.last === currentSquare;
            const isSelected = selectedSquare?.rowIdx === rowIdx && selectedSquare?.colIdx === colIdx;
            const isDarkSquare = (rowIdx + colIdx) % 2 === 0;

            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                className={`flex-1 flex justify-center items-center ${
                  isSelected ? 'bg-blue-500' :
                  isLastMove ? 'bg-lime-400' :
                  isDarkSquare ? "bg-orange-50" : "bg-lime-600"
                }`}
                style={{ minHeight: '50px', minWidth: '50px', boxSizing: 'border-box' }}
                onClick={() => {
                  if (!from) {
                    setFrom(currentSquare);
                    setSelectedSquare({ rowIdx, colIdx });
                  } else {
                    props.socket.send(JSON.stringify({ type: "MOVE", from: from, to: currentSquare }));
                    setFrom(null);
                    setSelectedSquare(null);
                  }
                }}
              >
                {piece && (
                  <img style={colr} src={`/pieces/${pieces.get(piece)}.png`} alt="" />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ChessBoard;
