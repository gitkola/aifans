import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import Head from 'next/head';
import { useAppSelector } from '@/redux/hooks/reduxHooks';
import { AppState } from '@/redux/store';
import axios from 'axios';

const ROWS = 20;
const COLS = 10;
const INITIAL_SPEED = 1000;
const SPEED_INCREMENT = 50;
const ROWS_TO_INCREASE_SPEED = 10;
const STATUS_BAR_HEIGHT = 30;

const shapes = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
  [[0, 1], [1, 1], [1, 0]],
  [[1, 0], [1, 1], [0, 1]],
];

type Shape = number[][];
type Position = { x: number; y: number };

const Game: React.FC = () => {
  const { user } = useAppSelector((state: AppState) => state.user);
  const isTouchEnabled = 'ontouchstart' in window && 'ongesturechange' in window;
  const [grid, setGrid] = useState<number[][]>(Array(ROWS).fill(Array(COLS).fill(0)));
  const [currentShape, setCurrentShape] = useState<Shape>(getRandomShape());
  const [nextShape, setNextShape] = useState<Shape>(getRandomShape());
  const [position, setPosition] = useState<Position>({ x: 4, y: 0 });
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [cellSize, setCellSize] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      const { innerHeight, innerWidth } = window;
      const maxCellWidth = Math.floor(innerWidth / COLS);
      const maxCellHeight = Math.floor((innerHeight - STATUS_BAR_HEIGHT) / ROWS);
      const newCellSize = Math.min(maxCellWidth, maxCellHeight) * 0.96;
      setCellSize(newCellSize);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  function getRandomShape(): Shape {
    return shapes[Math.floor(Math.random() * shapes.length)];
  }

  const createEmptyGrid = (): number[][] => {
    return Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
  };

  const isValidMove = useCallback((shape: Shape, newPosition: Position): boolean => {
    return shape.every((row, dy) =>
      row.every((cell, dx) =>
        cell === 0 ||
        (newPosition.x + dx >= 0 &&
          newPosition.x + dx < COLS &&
          newPosition.y + dy < ROWS &&
          (newPosition.y + dy < 0 || grid[newPosition.y + dy][newPosition.x + dx] === 0))
      )
    );
  }, [grid]);

  const rotateShape = (shape: Shape): Shape => {
    return shape[0].map((_, index) =>
      shape.map(row => row[index]).reverse()
    );
  };


  const updateScore = useCallback((clearedRows: number) => {
    const newScore = score + clearedRows * 100;
    setScore(newScore);

    if (newScore % (ROWS_TO_INCREASE_SPEED * 100) === 0) {
      setSpeed(prevSpeed => Math.max(100, prevSpeed - SPEED_INCREMENT));
    }
  }, [score]);


  const placeShape = useCallback(() => {
    const newGrid = grid.map(row => [...row]);
    currentShape.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell !== 0) {
          const newY = position.y + dy;
          const newX = position.x + dx;
          if (newY >= 0 && newY < ROWS && newX >= 0 && newX < COLS) {
            newGrid[newY][newX] = 1;
          }
        }
      });
    });

    setGrid(newGrid);
    setCurrentShape(nextShape);
    setNextShape(getRandomShape());
    setPosition({ x: 4, y: 0 });

    const clearedRows = clearRows(newGrid);
    updateScore(clearedRows);

    if (!isValidMove(nextShape, { x: 4, y: 0 })) {
      setIsGameOver(true);
    }
  }, [currentShape, grid, position, nextShape, isValidMove, updateScore]);

  const moveShape = useCallback((direction: 'left' | 'right' | 'down' | 'rotate'): void => {
    if (isPaused || isGameOver) return;

    let newPosition = { ...position };
    let newShape = currentShape;

    switch (direction) {
      case 'left':
        newPosition.x -= 1;
        break;
      case 'right':
        newPosition.x += 1;
        break;
      case 'down':
        newPosition.y += 1;
        break;
      case 'rotate':
        newShape = rotateShape(currentShape);
        break;
    }

    if (isValidMove(newShape, newPosition)) {
      setPosition(newPosition);
      setCurrentShape(newShape);
    } else if (direction === 'down') {
      placeShape();
    }
  }, [currentShape, position, isValidMove, isPaused, isGameOver, placeShape]);

  const clearRows = (grid: number[][]): number => {
    let clearedRows = 0;
    const newGrid = grid.filter(row => {
      if (row.every(cell => cell !== 0)) {
        clearedRows++;
        return false;
      }
      return true;
    });

    while (newGrid.length < ROWS) {
      newGrid.unshift(Array(COLS).fill(0));
    }

    setGrid(newGrid);
    return clearedRows;
  };

  const pauseGame = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  const resetGame = () => {
    setGrid(createEmptyGrid());
    setCurrentShape(getRandomShape());
    setNextShape(getRandomShape());
    setPosition({ x: 4, y: 0 });
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsGameOver(false);
    setIsPaused(false);
  };

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") moveShape("left");
    if (e.key === "ArrowRight") moveShape("right");
    if (e.key === "ArrowUp") moveShape("rotate");
    if (e.key === "ArrowDown") moveShape("down");
    if (e.key === " ") pauseGame();
  }, [moveShape, pauseGame]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeydown);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleKeydown]);

  useEffect(() => {
    if (!isPaused && !isGameOver) {
      intervalRef.current = setInterval(() => moveShape('down'), speed);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [speed, isPaused, isGameOver, moveShape]);

  const renderGrid = () => {
    const renderedGrid = grid.map((row, y) => [...row]);
    currentShape.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell !== 0) {
          const newY = position.y + dy;
          const newX = position.x + dx;
          if (newY >= 0 && newY < ROWS && newX >= 0 && newX < COLS) {
            renderedGrid[newY][newX] = 2;
          }
        }
      });
    });

    return renderedGrid.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            style={{ width: cellSize + 'px', height: cellSize + 'px' }}
            className={`border border-gray-700 ${cell === 1 ? 'bg-blue-500' : cell === 2 ? 'bg-red-500' : 'bg-gray-900'}`}
          />
        ))}
      </div>
    ));
  };

  const renderNextShape = () => {
    return nextShape.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className={`w-2 h-2 ${cell ? 'bg-red-500' : 'bg-transparent'}`}
          />
        ))}
      </div>
    ));
  };

  const saveGameState = useCallback(async () => {
    if (!user || !user.id) return;

    const gameState = {
      grid,
      currentShape,
      nextShape,
      position,
      score,
      speed,
    };

    try {
      await axios.post('/api/game/save', {
        userId: user.id,
        gameState,
      });
      console.log('Game state saved successfully');
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, [user, grid, currentShape, nextShape, position, score, speed]);

  const loadGameState = useCallback(async () => {
    if (!user || !user.id) return;

    try {
      const response = await axios.get(`/api/game/load?userId=${user.id}`);
      const { gameState } = response.data;

      if (gameState) {
        setGrid(gameState.grid);
        setCurrentShape(gameState.currentShape);
        setNextShape(gameState.nextShape);
        setPosition(gameState.position);
        setScore(gameState.score);
        setSpeed(gameState.speed);
        setIsGameOver(false);
        setIsPaused(false);
        console.log('Game state loaded successfully');
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
  }, [user]);

  useEffect(() => {
    loadGameState();
  }, [loadGameState]);

  return (
    <div id="game" className="flex flex-col items-center justify-start min-h-scree">
      <Head>
        <title>Tetris Game</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <style>{`
          body {
            touch-action: none;
            user-select: none;
            -webkit-user-select: none;
          }
        `}</style>
      </Head>
      <div className={`top-0 left-0 right-0 w-full flex flex-row justify-center`}>
        <div className={`flex items-center justify-center flex-row m-4`}>
          <h2 className="text-l font-semibold">Score:</h2>
          <h2 className="text-l font-semibold ml-2">{score}</h2>
        </div>
        <div className={`flex items-center justify-center flex-row m-4`}>
          <h2 className="text-l font-semibold mr-2">Next</h2>
          <div>{renderNextShape()}</div>
        </div>
        <div className={`flex`}>
          <button
            className="text-4xl mr-2"
            onClick={pauseGame}
          >
            {isPaused ? '▶️' : '⏸️'}
          </button>
          <button
            className="text-4xl"
            onClick={saveGameState}
          >
            💾
          </button>
          <button
            className="m-4 px-2 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={loadGameState}
          >
            Load Saved Game
          </button>
        </div>
      </div>
      <div className="border border-gray-700">
        {renderGrid()}
      </div>
      {isGameOver && (
        <div className={`absolute top-32 bg-center flex flex-col items-center justify-center px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800`}>
          <h2 className="text-4xl font-semibold text-red-500 m-4">Game Over!</h2>
          <button
            className="m-4 px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={resetGame}
          >
            Restart
          </button>
        </div>
      )}
      {isTouchEnabled && <div className="fixed bottom-4 mt-4 grid grid-cols-3 gap-2 w-full px-4 lg:hidden md:hidden sm:visible">
        <div className="px-4 py-4"></div>
        <button
          className="px-4 py-4 border border-gray-500 rounded text-white"
          onTouchStart={() => moveShape('rotate')}
        >
          Rotate
        </button>
        <div className="px-4 py-4"></div>
        <button
          className="px-4 py-4 border border-gray-500 rounded text-white"
          onTouchStart={() => moveShape('left')}
        >
          Left
        </button>
        <button
          className="px-4 py-4 border border-gray-500 rounded text-white"
          onTouchStart={() => moveShape('down')}
        >
          Down
        </button>
        <button
          className="px-4 py-4 border border-gray-500 rounded text-white"
          onTouchStart={() => moveShape('right')}
        >
          Right
        </button>
      </div>}
    </div>
  );
};

export default Game;