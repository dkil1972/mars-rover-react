import React from 'react';
import Grid from './components/grid'
import Controls from './components/controls'
import './App.css';
import utils from './utils';

const grid = {
  x: 5,
  y: 5,
  maxCoordinate: input => input - 1,
  coordinates: () => {
    return utils.range(0, grid.maxCoordinate(grid.x))
      .map((row) =>
        utils.range(0, grid.maxCoordinate(grid.y))
          .map((cell) => {
            return { x: (grid.maxCoordinate(grid.x - row)), y: cell }
          }))
      .flat();
  }
}

const position = {
  x: 1,
  y: 2,
  orientation: 'N'
}

const movement = {
  l: (position) => console.log(`instruction was left current position is ${position.orientation}`),
  r: (position) => console.log(`instruction was right current position is ${position.orientation}`),
  m: (position) => console.log(`instruction was move x,y is ${position.x},${position.y}`)
}

const rover = {
  startingPosition: position,
  isOccupying: (coordinate) => {
    return rover.startingPosition.x === coordinate.x && 
           rover.startingPosition.y === coordinate.y;
  },
  move: (userInstructions) => {
    userInstructions.map(instruction => movement[instruction.toLowerCase()](rover.startingPosition))
  }
}

const rovers = [rover];

function App() {
  return (
    <>
      <Controls rovers={rovers} />
      <Grid plateau={grid} rovers={rovers}/>
    </>
  );
}

export default App;
