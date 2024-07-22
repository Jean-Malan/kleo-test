import React, {useState} from 'react';
import Maze from './components/Maze';
const App: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="App">
      <h1>Maze Game</h1>
      <button onClick={toggleInstructions}>
        {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
      </button>
      {showInstructions && (
        <div className="instructions">
          <h2>Game Instructions</h2>
          <p><strong>Objective:</strong></p>
          <ul>
            <li>Navigate through the maze and reach the exit.</li>
          </ul>
          <p><strong>Controls:</strong></p>
          <ul>
            <li>Use the arrow keys to rotate your view:
              <ul>
                <li><strong>Left Arrow</strong>: Turn left</li>
                <li><strong>Right Arrow</strong>: Turn right</li>
              </ul>
            </li>
            <li>Use the <strong>Spacebar</strong> to move forward in the direction you're facing.</li>
          </ul>
          <p><strong>Walls:</strong></p>
          <ul>
            <li>The walls are black and block your path.</li>
            <li>You cannot move through walls. Plan your moves to avoid hitting them.</li>
            <li>Use the 3D view to see a few steps ahead and identify any walls in your path.</li>
            <li>The 2D view provides a top-down layout of the entire maze, which can be accessed by clicking the "Stuck? View the 2D view for a hint" button.</li>
          </ul>
          <p><strong>Winning the Game:</strong></p>
          <ul>
            <li>Reach the green exit point to win the game.</li>
            <li>Your moves and direction will be displayed on the screen.</li>
            <li>You can reset the game anytime by clicking the "Try Again" button.</li>
          </ul>
          <p><strong>Tips:</strong></p>
          <ul>
            <li>Use the 2D view sparingly for a more challenging experience.</li>
            <li>Plan your moves by observing the walls in the 3D view.</li>
            <li>Keep track of your moves to try and beat your high score.</li>
          </ul>
          <p><strong>Example:</strong></p>
          <ul>
            <li>If you see a wall directly in front of you, turn left or right and move forward to find an open path.</li>
            <li>Use the arrow keys to navigate through the maze efficiently.</li>
          </ul>
        </div>
      )}
      <Maze />
    </div>
  );
};

export default App;