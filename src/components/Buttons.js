import React from 'react'

const Buttons = ({ playButton, pauseButton, clear, slow, fast, seed }) => {
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
            <button onClick={slow}>
                Slow
            </button>
            <button onClick={fast}>
                Fast
            </button>
            <button onClick={seed}>
                Seed
            </button>
        </div>
    );
}


export default Buttons;