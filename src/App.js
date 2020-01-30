import React, {useState} from 'react';
import Grid from './components/grid'
import Controls from './components/controls'
import './App.css';
import utils from './utils';

const grid = {
  coordinates: () => {
    const maxCoordinate = input => input - 1;
    const x = 5;
    const y = 5;
    return utils.range(0, maxCoordinate(x))
      .map((row) =>
        utils.range(0, maxCoordinate(y))
          .map((cell) => {
            return { x: (maxCoordinate(x - row)), y: cell }
          }))
      .flat();
  },
}

  const turnLeft = (position) => {
    console.log(`in turnleft position is ${position.orientation}`)
    let newPosition = {};
    if(position.orientation === 'N') {
      newPosition = {x: position.x, y: position.y, orientation: 'W'};
    }
    if(position.orientation === 'W') {
      newPosition = {x: position.x, y: position.y, orientation: 'S'};
    }
    if(position.orientation === 'S') {
      newPosition = {x: position.x, y: position.y, orientation: 'E'};
    }
    if(position.orientation === 'E') {
      newPosition = {x: position.x, y: position.y, orientation: 'N'};
    }
    console.log(`in turnleft new position is ${newPosition.orientation}`)
    return newPosition;
  }

  const turnRight = (position) => {
    console.log(`in turnleft position is ${position.orientation}`)
    let newPosition = {};
    if(position.orientation === 'N') {
      newPosition = {x: position.x, y: position.y, orientation: 'E'};
    }
    if(position.orientation === 'E') {
      newPosition = {x: position.x, y: position.y, orientation: 'S'};
    }
    if(position.orientation === 'S') {
      newPosition = {x: position.x, y: position.y, orientation: 'W'};
    }
    if(position.orientation === 'W') {
      newPosition = {x: position.x, y: position.y, orientation: 'N'};
    }
    console.log(`in turnleft new position is ${newPosition.orientation}`)
    return newPosition;
  }

  const forward = (position) => {
    let newPosition = {};
    if(position.orientation === 'N') {
      newPosition = {x: position.x, y: position.y + 1, orientation: position.orientation};
    }
    if(position.orientation === 'S') {
      newPosition = {x: position.x, y: position.y - 1, orientation: position.orientation};
    }
    if(position.orientation === 'E') {
      newPosition = {x: position.x + 1, y: position.y, orientation: position.orientation};
    }
    if(position.orientation === 'W') {
      newPosition = {x: position.x - 1, y: position.y, orientation: position.orientation};
    }
    return newPosition;
  }

const movement = {
  l: turnLeft,
  r: turnRight,
  m: forward
}

const move = (instruction, currentPosition) => {
  return movement[instruction.toLowerCase()](currentPosition);
}

function App() {
  const [userInput, setUserInput] = useState('');
  const [position, setPosition] = useState({ x: 1, y: 2, orientation: 'N' })
  const isValid = (input) => { return true; };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(isValid(userInput)) {
      setPosition(move(userInput.split('')[0], position))
    } else {
      //not sure what to do yet
    }
  }

  const handleChange = (event) => setUserInput(event.target.value);

  return (
    <>
      <Controls 
        userInput={userInput}
        onSubmit={handleSubmit} 
        onChange={handleChange}/>
      <Grid plateau={grid} currentPosition={position} />
    </>
  );
}

export default App;
