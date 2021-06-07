import React from 'react';

const Box = ({ boxClass, boxId, row, col, boxSelection }) => {

    return (
        <div
            className={boxClass}
            id={boxId}
            onClick={() => { boxSelection(row, col) }}
        />
    )

}

export default Box;