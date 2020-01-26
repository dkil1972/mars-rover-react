import React, {useState} from 'react';
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
  },
  isOccupied: (coordinate, movingRover) => {
  return movingRover.startingPosition.x === coordinate.x && 
          movingRover.startingPosition.y === coordinate.y;
  }
}

const movement = {
  l: (position) => console.log(`instruction was left current position is ${position.orientation}`),
  r: (position) => console.log(`instruction was right current position is ${position.orientation}`),
  m: (position) => console.log(`instruction was move x,y is ${position.x},${position.y}`)
}

const rover = {
  startingPosition: { x: 1, y: 2, orientation: 'N' },
  move: (userInstructions) => {
    // userInstructions.map(instruction => 
    //   movement[instruction.toLowerCase()](rover.startingPosition))
    return {
      startingPosition: {x: 2, y: 2, orientation: 'N'}, 
      isOccupying: rover.isOccupying, 
      move: rover.move
    };
  }
}

const rovers = [rover];

function App() {
  const [userInput, setUserInput] = useState('');
  const [movingRover, setMovingRover] = useState(rover);
  const isValid = (input) => { return true; };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(isValid(userInput)) {
      setMovingRover(movingRover.move(userInput.split('')));
    } else {
      //not sure what to do yet
    }
  }

  const handleChange = (event) => setUserInput(event.target.value);

  return (
    <>
      <Controls rovers={rovers} 
        userInput={userInput}
        onSubmit={handleSubmit} 
        onChange={handleChange}/>
      <Grid plateau={grid} movingRover={movingRover}/>
    </>
  );
}

export default App;
