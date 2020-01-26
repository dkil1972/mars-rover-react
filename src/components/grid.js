import React from 'react';

const Grid = (props) => {

    const getClassNameFor = (coordinate) => {
        return props.plateau.isOccupied(coordinate, props.movingRover) 
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