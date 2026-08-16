import React, { useState, useEffect } from 'react';

const ChessTimer = ({timer}) => {
  if(!timer)return <div>Loading... </div>
  return (
    <div>
      <div className="py-1 px-2 rounded-xl border-2 text-white">
        {`${timer.minutes}:${timer.seconds}`}
      </div>
    </div>
  );
};

export default ChessTimer;
