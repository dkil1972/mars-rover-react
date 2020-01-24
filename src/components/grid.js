import React from 'react';

const Grid = (props) => {
    return (
        <div className="grid">
            {props.plateau.coordinates().map((coordinate, idx) =>
                <div key={idx} className="cell occupied">
                    {coordinate.x + ',' + coordinate.y}
                </div>)}
        </div>
    );
}

export default Grid;