import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css'
import Grid from './components/Grid.js'
import Buttons from './components/Buttons.js'

class App extends React.Component {
    constructor() {
        super()
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;
        this.state = {
            generations: 0,
            //Creates an array with a length of 30 where each of those rows will
            // be filled with cols of size 50
            initialGrid: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }

    selectBox = (row, col) => {
        const gridCopy = [...this.state.initialGrid]
        //Creates a copy of the grid and updates the grid based on selection
        gridCopy[row][col] = !gridCopy[row][col]
        this.setState({
            initialGrid: gridCopy
        })
    }



    seed = () => {
        console.log('SEED RAN')
        const gridCopy = [...this.state.initialGrid];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                //If the random number turns out be 1
                if (Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true;
                }
            }
        }
        this.setState({
            initialGrid: gridCopy
        })
    }



    playButton = () => {
        //Cancels the previous timer and starts again
        clearInterval(this.intervalId)
        //This will run the play function every 100 ms
        this.intervalId = setInterval(this.play, this.speed)
    }

    pauseButton = () => {
        clearInterval(this.intervalId)
    }

    clear = () => {
        let grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false))

        this.setState({
            initialGrid: grid,
            generations: 0,
        })
        clearInterval(this.intervalId)
    }

    gridSize = (size) => {
        switch (size) {
            case "1":
                this.cols = 20;
                this.rows = 10;
                break;
            case "2":
                this.cols = 50;
                this.rows = 30;
                break;
            default:
                this.cols = 70;
                this.rows = 50;
        }
        this.clear()
    }
    play = () => {
        let g = this.state.initialGrid
        let g2 = [...this.state.initialGrid]

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                //Count is incremented based on live neighbors
                let count = 0;

                if (i > 0) {
                    //Neighbor right above the current cell
                    if (g[i - 1][j]) {
                        count++;
                    }
                }

                if (i > 0 && j > 0) {
                    //diagonal upper left neighbor
                    if (g[i - 1][j - 1]) {
                        count++;
                    }
                }

                if (i > 0 && j < this.cols - 1) {
                    //diagonal upper right neighbor
                    if (g[i - 1][j + 1]) {
                        count++;
                    }
                }

                if (j < this.cols - 1) {
                    //neighbor on the exact right
                    if (g[i][j + 1]) {
                        count++;
                    }
                }

                if (j > 0) {
                    //neighbor on the exact left
                    if (g[i][j - 1]) {
                        count++;
                    }
                }

                if (i < this.rows - 1) {
                    //Neighbor right below the current cell
                    if (g[i + 1][j]) {
                        count++;
                    }
                }

                if (i < this.rows - 1 && j > 0) {
                    //Neighbor on the diagonal bottom left
                    if (g[i + 1][j - 1]) {
                        count++;
                    }
                }

                if (i < this.rows - 1 && this.cols - 1) {
                    //Neighbor on the diagonal bottom right
                    if (g[i + 1][j + 1]) {
                        count++;
                    }
                }

                //If the current cell is alive and it is surrounded by 
                // either less than 2 neighbors or more than 2 neighbors
                // the current cell will die because of underpopulation or overpopulation
                if (g[i][j] && (count < 2 || count > 3)) {
                    g2[i][j] = false;
                }

                //If the current cell is dead and it is surrounded by exactly
                // 3 neighbors then the current cell will become alive
                if (!g[i][j] && count === 3) {
                    g2[i][j] = true;
                }

            }
        }

        this.setState({
            initialGrid: g2,
            generations: this.state.generations + 1

        })
    }

    componentDidMount() {
        console.log("Component Mounted")
        this.seed()
    }

    render() {
        return (
            <div>
                <h1>Conway's Game of Life</h1>
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    clear={this.clear}
                    seed={this.seed}
                    gridSize={this.gridSize}
                />
                <h2>Stages : {this.state.generations}</h2>
                <Grid
                    initialGrid={this.state.initialGrid}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))