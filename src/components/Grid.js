import React from 'react'
import Box from './Box.js'

const Grid = ({ rows, cols, initialGrid, selectBox }) => {
    const width = cols * 16
    const rowsArr = []
    let boxClass = ""

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let boxId = i + "_" + j
            boxClass = initialGrid[i][j] ? "box on" : "box off"

            rowsArr.push(
                <Box
                    boxClass={boxClass}
                    key={boxId}
                    boxId={boxId}
                    row={i}
                    col={j}
                    selectBox={selectBox}
                />
            )
        }
    }
    return (
        <div className="grid" style={{ width: width }}>
            {rowsArr}
        </div>
    )

}


export default Grid;