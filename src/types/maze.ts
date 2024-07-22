// src/maze.ts
export interface Cell {
    value: number;
  }
  
  export type Maze = Cell[][];
  
  export const maze: Maze = [
    [{ value: 1 }, { value: 0 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [{ value: 1 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 1 }],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 0 }, { value: 1 }],
    [{ value: 1 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
  ];
  