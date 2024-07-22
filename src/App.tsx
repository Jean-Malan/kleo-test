import React from 'react';
import Maze from './components/Maze';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Maze Game</h1>
      <div className="instructions">
        <h2>How to Play</h2>
        <p>Welcome to the Maze Game! Your goal is to navigate through the maze and reach the exit.</p>
        <ul>
          <li>Use the arrow keys to change your direction:</li>
          <ul>
            <li>Up Arrow: Face Up</li>
            <li>Down Arrow: Face Down</li>
            <li>Left Arrow: Face Left</li>
            <li>Right Arrow: Face Right</li>
          </ul>
          <li>Press the <strong>Spacebar</strong> to move forward in the direction you're facing.</li>
          <li>If you get stuck, click the button to reveal the 2D view of the maze for a hint.</li>
          <li>Try to reach the exit with the fewest moves possible. Good luck!</li>
        </ul>
      </div>
      <Maze />
    </div>
  );
};

export default App;