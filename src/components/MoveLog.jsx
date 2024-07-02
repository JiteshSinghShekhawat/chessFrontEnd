import React from "react";

function MoveLog(props){
    return (
    <div className="overflow-y-scroll flex-1 w-3/4 grid grid-cols-2 bg-stone-400 mx-auto mt-5 shadow-xl rounded-lg">
        <div className="flex flex-col items-start shadow-xl">
            <div className="mx-auto font-bold mb-1">White</div>
            {props.moves.filter(move => move.player === 'white').map((move, index) => (
            <div key={index} className="mx-auto">
                {move.move}
            </div>
            ))}
        </div>
        <div className="flex flex-col items-start">
            <div className="mx-auto font-bold mb-1">Black</div>
            {props.moves.filter(move => move.player === 'black').map((move, index) => (
            <div key={index} className="mx-auto">
            {move.move}
            </div>
            ))}
        </div>
    </div>); 
}


export default MoveLog ; 