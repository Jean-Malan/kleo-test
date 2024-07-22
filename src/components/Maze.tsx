// src/components/Maze.tsx
import { FC, useState, useEffect } from 'react';
import { maze, Cell } from '../types/maze';
import styles from './Maze.module.css';
const Maze: FC = () => {
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 0 });
  const [dir, setDir] = useState<'up' | 'down' | 'left' | 'right'>('right');
  const [gameOver, setGameOver] = useState(false);
  const [moves, setMoves] = useState(0);
  const [show2DView, setShow2DView] = useState(false);
  const [userName, setUserName] = useState('');
  const [topScores, setTopScores] = useState<{name: string, score: number}[]>([]);

  const exitPos = { x: 4, y: 3 };

  const saveScore = () => {
    if (userName && gameOver) {
      const newScore = { name: userName, score: moves };
      const updatedScores = [...topScores, newScore].sort((a, b) => a.score - b.score).slice(0, 5);
      setTopScores(updatedScores);
      // Here you would typically save the scores to local storage or a backend
      localStorage.setItem('mazeTopScores', JSON.stringify(updatedScores));
    }
  };

  useEffect(() => {
    const savedScores = localStorage.getItem('mazeTopScores');
    if (savedScores) {
      setTopScores(JSON.parse(savedScores));
    }
  }, []);

  const handleKey = (e: KeyboardEvent) => {
    let { x, y } = playerPos;
    let moved = false;

    if (e.key === 'ArrowUp') {
      setDir('up');
    } else if (e.key === 'ArrowDown') {
      setDir('down');
    } else if (e.key === 'ArrowLeft') {
      setDir('left');
    } else if (e.key === 'ArrowRight') {
      setDir('right');
    } else if (e.key === ' ') {
      if (dir === 'up' && maze[y - 1] && maze[y - 1][x].value === 0) {
        y--;
        moved = true;
      } else if (dir === 'down' && maze[y + 1] && maze[y + 1][x].value === 0) {
        y++;
        moved = true;
      } else if (dir === 'left' && maze[y][x - 1] && maze[y][x - 1].value === 0) {
        x--;
        moved = true;
      } else if (dir === 'right' && maze[y][x + 1] && maze[y][x + 1].value === 0) {
        x++;
        moved = true;
      }
      if (moved) {
        setPlayerPos({ x, y });
        setMoves(moves + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [playerPos, dir]);

  useEffect(() => {
    if (playerPos.x === exitPos.x && playerPos.y === exitPos.y) {
      setGameOver(true);
    }
  }, [playerPos, exitPos]);

  const render3DView = () => {
    const view = [];
    let { x, y } = playerPos;

    for (let i = 0; i < 5; i++) {
      if (dir === 'up') y--;
      else if (dir === 'down') y++;
      else if (dir === 'left') x--;
      else if (dir === 'right') x++;

      if (!maze[y] || !maze[y][x]) break;

      const left = maze[y][x - 1]?.value === 1;
      const right = maze[y][x + 1]?.value === 1;
      const front = maze[y][x].value === 1;

      view.push({ front, left, right });

      if (front) break;
    }

    return (
      <div className={styles.maze3dView}>
        {view.map((block, index) => (
          <div key={index} className={`${styles.corridorSegment} ${styles[`depth${index}`]}`}>
            {block.left && <div className={`${styles.wall} ${styles.leftWall}`} />}
            {block.right && <div className={`${styles.wall} ${styles.rightWall}`} />}
            {block.front && <div className={`${styles.wall} ${styles.frontWall}`} />}
            {!block.front && <div className={styles.floor} />}
            {!block.front && <div className={styles.ceiling} />}
          </div>
        ))}
      </div>
    );
  };

  const resetGame = () => {
    setPlayerPos({ x: 1, y: 0 });
    setDir('right');
    setGameOver(false);
    setMoves(0);
  };

  const render2DView = () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${maze[0].length}, 20px)`,
      }}
    >
      {maze.flat().map((cell, index) => {
        const x = index % maze[0].length;
        const y = Math.floor(index / maze[0].length);
        return (
          <div
            key={index}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor:
                playerPos.x === x && playerPos.y === y
                  ? 'red'
                  : cell.value === 1
                  ? 'black'
                  : 'white',
              border: '1px solid grey',
            }}
          />
        );
      })}
    </div>
  );

  const TopScores = () => (
    <div className={styles.topScores}>
      <h3>Top Scores</h3>
      <table className={styles.scoreTable}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Moves</th>
          </tr>
        </thead>
        <tbody>
          {topScores.map((score, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score.name}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  return (
    <div className={styles.mazeContainer}>
      <div className={styles.viewsContainer}>
        <div className={styles.maze3dView}>
          <h3>3D View</h3>
          {render3DView()}
        </div>
        <div>
          {show2DView && render2DView()}
        </div>
      </div>
      <button onClick={() => setShow2DView(!show2DView)}>
        {show2DView ? 'Hide 2D View' : 'Stuck? View the 2D view for a hint'}
      </button>
      <div className={styles.info}>
        <p>Moves: {moves}</p>
        <p>Direction: {dir}</p>
      </div>
      {gameOver && (
        <div className={styles.gameOver}>
          <h2>Congratulations!</h2>
          <p>You've reached the exit in {moves} moves!</p>
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={saveScore}>Save Score</button>
          <button onClick={resetGame}>Try Again</button>
        </div>
      )}
      <TopScores />
    </div>
  );
};

export default Maze;