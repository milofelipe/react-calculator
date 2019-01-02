import React from "react";

export function Button(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}