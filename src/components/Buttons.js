import React from 'react'

const Buttons = ({ playButton, pauseButton, clear, seed, gridSize }) => {

    const handleSelect = (evt) => {
        gridSize(evt.target.value)
    }

    return (
        <div className="center">
            <button onClick={playButton}>
                Play
            </button>
            <button onClick={pauseButton}>
                Pause
            </button>
            <button onClick={clear}>
                Clear
            </button>
            <button onClick={seed}>
                Seed
            </button>
            <label>Select GridSize</label>
            <select onChange={handleSelect}>
                <option value="1">20 x 10</option>
                <option value="2">50 x 30</option>
                <option value="3">70 x 50</option>
            </select>
        </div>
    )
}

export default Buttons;