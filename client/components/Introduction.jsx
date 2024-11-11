import React, { Component, useEffect, useState }  from "react";
import DynamicBlock from './blocks/DynamicBlock.jsx'
import {SMALLGRID, GRID, TETROMINOS, SHAPES, TETROCOLORS} from '../constants/tetromino';

const Introduction = ({firstVisit}) => {

  const initializeGame = () => {
    const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    window.localStorage.setItem('FIRST_VISIT', JSON.stringify({ value: true, expire: threeDaysFromNow.getTime() }));
    firstVisit();
  };

  return (
    <div className='introduction-instructions'>
        <div className="message-container">
          <h1 id="message">Welcome to Tetris! My name is Luis Navarro and I developed this version of Tetris!</h1>
        </div>
        {/* <!-- Keyboard Container --> */}
        <div className="keyboard">
          <div className="top-row">
          <div className="key-tank">
          <div className="key-instruction">SLAM</div>
            <div className="key">
              <p>W</p>
            </div>
            </div>
          </div>
          <div className="bottom-row">
            <div className="key-tank">
            <div className="key-instruction">MOVE LEFT</div>
              <div data-key="65" className="key">
                <p>A</p>
              </div>
            </div>
            <div className="key-tank">
             <div className="key-instruction">MOVE DOWN</div>
              <div data-key="83" className="key">
                <p>S</p>
              </div>    
            </div>  
            <div className="key-tank">
              <div className="key-instruction">MOVE RIGHT</div>
            <div data-key="68" className="key">
              <p>D</p>
            </div>
            </div>   
          </div>
          </div>  
        {/* <!-- Keyboard Container --> */}
        <div className="keyboard">
          <div className="top-row">
          <div className="key-tank">
          <div className="key-instruction"></div>
            <div className="key">
              <p>▲</p>
            </div>
            </div>
          </div>
          <div className="bottom-row">
            <div className="key-tank">
            <div className="key-instruction">ROTATE LEFT</div>
              <div data-key="65" className="key">
                <p>◄</p>
              </div>
            </div>
            <div className="key-tank">
             <div className="key-instruction">SAVE TETRO</div>
              <div data-key="83" className="key">
                <p>▼</p>
              </div>    
            </div>  
            <div className="key-tank">
              <div className="key-instruction">ROTATE RIGHT</div>
            <div data-key="68" className="key">
              <p>►</p>
            </div>
          </div>   
        </div>
      </div>
      <div className="genesisFooter">
       <button className="genesisButton" role="button" onClick={initializeGame}>START</button> 
      </div>
      
    </div>
  )
}

export default Introduction;