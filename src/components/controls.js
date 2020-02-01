import React, {useEffect} from 'react';

const Controls = (props) => {
    return(
        <div className="controls"> 
            <form onSubmit={props.onSubmit}>
                <input type="text"
                    value={props.userInput}
                    onChange={props.onChange}
                />
                <input type="submit" value="Move" />
            </form>
        </div>
    )
}

export default Controls;