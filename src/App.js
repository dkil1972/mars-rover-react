import React from 'react';
import Grid from './components/grid'
import './App.css';
import utils from './utils';

const gridSize = {
  x: 5,
  y: 5,
  
  coordinates: () => {
    return utils.range(0, gridSize.x - 1)
      .map((row) =>
        utils.range(0, gridSize.y - 1)
          .map((cell) => {
            return { x: (gridSize.x - row - 1), y: cell }
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
  return <Grid size={gridSize} rovers={rovers}/>
}

export default App;
