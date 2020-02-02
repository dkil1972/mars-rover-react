import React, {useState, useEffect} from 'react';
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
  if (facingNorth(position)) {
    return { ...position, orientation: 'W' };
  }
  if (facingWest(position)) {
    return { ...position, orientation: 'S' };
  }
  if (facingSouth(position)) {
    return { ...position, orientation: 'E' };
  }
  if (facingEast(position)) {
    return { ...position, orientation: 'N' };
  }
}

const turnRight = (position) => {
  if (facingNorth(position)) {
    return { ...position, orientation: 'E' };
  }
  if (facingEast(position)) {
    return { ...position, orientation: 'S' };
  }
  if (facingSouth(position)) {
    return { ...position, orientation: 'W' };
  }
  if (facingWest(position)) {
    return { ...position, orientation: 'N' };
  }
}

const isFacing = (orientation) => (position) => position.orientation === orientation;
const facingNorth = isFacing('N');
const facingSouth = isFacing('S');
const facingWest = isFacing('W');
const facingEast = isFacing('E');

const add = x => y => x + y;
const subtract = x => y => y - x;
const addOneTo = add(1);
const subtractOneFrom = subtract(1);
const moveUp = (position) => {
  return { ...position, x: addOneTo(position.x) };
}

const moveDown = (position) => {
  return { ...position, x: subtractOneFrom(position.x), };
}

const moveLeft = (position) => {
  return { ...position, y: subtractOneFrom(position.y), };
}

const moveRight = (position) => {
  return { ...position, y: addOneTo(position.y), };
}

const forward = (position) => {
  if (facingNorth(position)) {
    return moveUp(position);
  }
  if (facingSouth(position)) {
    return moveDown(position);
  }
  if (facingEast(position)) {
    return moveRight(position);
  }
  if (facingWest(position)) {
    return moveLeft(position);
  }
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
  const [moves, setMoves] = useState({
    position: { x: 1, y: 2, orientation: 'N' }, 
    toBeCompleted: 0, 
    instructionIndex: 0 
  });
  const [fullMoveInstructions, setFullMoveInstruction] = useState('');
  const isValid = (input) => { return true; };

  useEffect(() => {
    if (moves.toBeCompleted > 0 && fullMoveInstructions.length) {
      const timerId = setTimeout(() => {
        const instruction = fullMoveInstructions[moves.instructionIndex];
        setMoves({
          position: move(instruction, moves.position), 
          toBeCompleted: subtractOneFrom(moves.toBeCompleted), 
          instructionIndex: addOneTo(moves.instructionIndex),
        });
      }, 500);
      return () => clearTimeout(timerId);
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    if(isValid(userInput)) {
      setFullMoveInstruction(userInput.split(''));
      setMoves({
        position:moves.position, 
        toBeCompleted: userInput.split('').length, 
        instructionIndex: 0
      });
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
      <Grid plateau={grid} currentPosition={moves.position} />
    </>
  );
}

export default App;
