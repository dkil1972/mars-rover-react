import React, {useState} from 'react';

const Controls = (props) => {
    const [userInput, setUserInput] = useState('');
    const isValid = (input) => { return true; };

    const handleSubmit = (event) => {
        event.preventDefault();
        return isValid(userInput) ? props.rovers[0].move(userInput.split('')) : null;
        // const [canMove, endPosition] = 
        //     props.rovers[0].tryMoving(event.target.value);
        // return canMove ? 'yes' : 'no';
    }
    
    return(
        <div className="controls">
            <form onSubmit={handleSubmit}>
                <input type="text" value={userInput} onChange={(event) => setUserInput(event.target.value)}/>
                <input type="submit" value="Move" />
            </form>
        </div>
    )
}

export default Controls;