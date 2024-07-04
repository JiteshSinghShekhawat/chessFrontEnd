import React, { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import ChessBoard from "../components/ChessBoard";
import MoveLog from "../components/MoveLog";
import { json } from "react-router-dom";
import './App.css';

export const INIT_GAME = "init_game";   
export const MOVE = "move"; 
export const GAME_OVER = "game_over";  




function Game() {
  const [gameState,setGameState] = useState('8........7........6........5........4........3........2PPPPPPPP1RNBQKBNR'); 
  const [message,setMessage] = useState(null); 
  const socket = useSocket(); 
  const [flag,setFlag] = useState(true); 
  const [moves,setMoves] = useState([{}]); 
  const [white,setWhite] = useState(true); 
  const [last,setLast]  = useState(null); 

  useEffect(()=>{
    if(!socket)return ;

    socket.onmessage = (event)=>{
      const data = JSON.parse(event.data); 
      console.log(data); 
      if(data.type === 'board'){
        setGameState(data.board);  
        setMessage(null); 
      }
      if(data.type === 'MESSAGE'){
        setMessage(data.MESSAGE); 
        if(data.MESSAGE.length>8){
          setMoves([{}]); 
        }
      }
      if(data.type === 'LOG'){
        setMoves((prevMoves) => [...prevMoves, { player: data.player, move: data.move }]);
        setLast(data.move); 
      }
      if(data.type === 'PIECES'){
        if(data.color === 'BLACK'){
          setWhite(false); 
        }else{
          setWhite(true); 
        }
      }
    }
  },[socket]); 

  if(!socket)return <div>Connecting...</div>
  return (
        <div  className="h-screen w-screen py-4 px-14 flex items-center justify-center">
          <div className="topp shadow-lg h-full w-3/4">
            <div className="board bg-green-600 h-full">
              <ChessBoard board={gameState} socket={socket} white={white} last={last}/>
            </div>  
            <div className="flex flex-col items-center justify-center chat p-3 bg-stone-700 h-full">
              <MoveLog moves = {moves}/>
              <div className="flex-3 text-white font-medium m-3">{message}</div>
             {flag && <button className="flex-2 w-3/4 bg-green-800 py-2 px-3 rounded-lg" onClick={()=>{
              socket.send(JSON.stringify({type : INIT_GAME})); 
              setFlag(false); 
            }}>
              Play 
            </button>}

            </div>
          </div>
        </div>

  );
}

export default Game;
