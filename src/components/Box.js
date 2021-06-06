import React from 'react';

const Box = ({ boxClass, boxId, row, col, selectBox }) => {
    selectBox = () => {
        selectBox(row, col)
    }
    return (
        <div
            className={boxClass}
            id={boxId}
            onClick={selectBox}
        />
    )

}

export default Box;