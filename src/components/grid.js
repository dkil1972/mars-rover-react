import React from 'react';

const Grid = (props) => {
    const isOccupied = (coordinate, currentPosition) => {
        console.log(`in is Occupied moving rover position is ${currentPosition.x},${currentPosition.y}`)
        return currentPosition.x === coordinate.x && 
               currentPosition.y === coordinate.y;
    }

    const getClassNameFor = (coordinate) => {
        return isOccupied(coordinate, props.currentPosition) 
            ? "cell occupied" : "cell";
    }

    return (
        <div className="grid">
            {props.plateau.coordinates().map((coordinate, idx) =>
                <div key={idx} className={getClassNameFor(coordinate)} >
                    {coordinate.x + ',' + coordinate.y}
                </div>)}
        </div>
    );
}

export default Grid;