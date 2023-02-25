import React from "react";

const Error = ({errors}) => {    
    return (
        <div className="error">
        {
            errors === undefined 
            ? null
            : <p style={{ color:"red" }} >{errors}</p>             

        }
        </div>

    );
}

export default Error;