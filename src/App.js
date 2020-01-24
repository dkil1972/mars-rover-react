import React from 'react';
import Grid from './components/grid'
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

const rover = {
  startingPosition: position,
}

const rovers = [rover];

function App() {
  return <Grid plateau={grid} rovers={rovers}/>
}

export default App;
