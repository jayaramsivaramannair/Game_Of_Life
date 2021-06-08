import React from 'react'
import Box from './Box.js'

const Grid = ({ gridFull, selectBox, cols }) => {
    let boxClass = "";
    const rowsArr = gridFull.map((rowArr, rowIdx) =>
        rowArr.map((item, colIdx) => {
            const boxId = `${rowIdx}_${colIdx}`;
            boxClass = gridFull[rowIdx][colIdx] ? "box on" : "box off";

            return (
                <Box
                    boxClass={boxClass}
                    key={boxId}
                    boxId={boxId}
                    row={rowIdx}
                    col={colIdx}
                    onBoxSelection={selectBox}
                />
            );
        })
    );

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 20px)` }}>
            {rowsArr}
        </div>
    );
};


export default Grid;