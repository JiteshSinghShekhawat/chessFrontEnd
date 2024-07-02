import React from "react";
import { useNavigate } from "react-router-dom"

function Landing() {
    const navigate = useNavigate(); 
  return (
    <div className="h-screen w-screen p-10 flex items-center justify-center">
      <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl">
        <div className="relative w-full sm:w-2/4">
          <img className="w-full h-auto" src="/board.jpeg" alt="Chess board" />
        </div>

        <div className="p-8 sm:w-1/2 sm:p-10 bg-stone-700 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Play Chess</h2>
          <img src="/pick.png" className="w-2/4 mx-auto mb-8" alt="Pick piece" />
          <button onClick={()=>{
            navigate('/game'); 
          }} className="block w-full max-w-xs mx-auto bg-green-500 text-white font-bold
            py-3 rounded-lg hover:bg-white hover:text-green-500 hover:border-green-500 border border-transparent transition duration-300">
            Play Online
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
