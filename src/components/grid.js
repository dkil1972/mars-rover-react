import React from 'react';

const Grid = (props) => {
    const getClassNameFor = (coordinate) => props.rovers.some(
            rover => rover.isOccupying(coordinate)
        ) ? "cell occupied" : "cell";

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