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
    return newPosition;
  }

  const turnRight = (position) => {
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
    return newPosition;
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
    if(facingNorth(position)) {
      return moveUp(position);
    }
    if(facingSouth(position)) {
      return moveDown(position);
    }
    if(facingEast(position)) {
      return moveRight(position);
    }
    if(facingWest(position)) {
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
  const [movesToBeCompleted, setMovesToBeCompleted] = useState({
    position: { x: 1, y: 2, orientation: 'N' }, 
    movesLeft: 0, 
    idx: 0 
  });
  const [fullMoveInstructions, setFullMoveInstruction] = useState('');
  const isValid = (input) => { return true; };

  useEffect(() => {
    if (movesToBeCompleted.movesLeft > 0 && fullMoveInstructions.length) {
      const timerId = setTimeout(() => {
        const instruction = fullMoveInstructions[movesToBeCompleted.idx];
        const np = move(instruction, movesToBeCompleted.position);
        console.log(`instruction is: ${instruction} 
          new position is: ${np.x},${np.y},${np.orientation}`);
        setMovesToBeCompleted({
          position: np, 
          movesLeft: movesToBeCompleted.movesLeft - 1, 
          idx: movesToBeCompleted.idx + 1
        });
      }, 1000);
      return () => clearTimeout(timerId);
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    if(isValid(userInput)) {
      setFullMoveInstruction(userInput.split(''));
      setMovesToBeCompleted({
        position:movesToBeCompleted.position, 
        movesLeft: userInput.split('').length, 
        idx: 0
      });
    } else {
      //not sure what to do yet
    }
  }

  useEffect(() => {
  });

  const handleChange = (event) => setUserInput(event.target.value);

  return (
    <>
      <Controls 
        userInput={userInput}
        onSubmit={handleSubmit} 
        onChange={handleChange}/>
      <Grid plateau={grid} currentPosition={movesToBeCompleted.position} />
    </>
  );
}

export default App;
