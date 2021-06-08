import React from 'react';

const Box = ({ row, col, onBoxSelection, boxClass, id }) => {
    const selectBox = () => {
        console.log('box clicked')
        onBoxSelection(row, col);
    };

    return (
        <div
            className={boxClass}
            id={id}
            onClick={selectBox}

        />
    );
}

export default Box;