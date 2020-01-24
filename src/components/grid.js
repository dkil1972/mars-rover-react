import React from 'react';

const Grid = (props) => {
    return (
        <div className="grid">
            {props.size.coordinates().map(coordinate =>
                <div className="cell occupied">
                    {coordinate.x + ',' + coordinate.y}
                </div>)}
        </div>
    );
}

export default Grid;