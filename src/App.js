import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css'
import Box from './components/Box.js'
import Grid from './components/Grid.js'
import Buttons from './components/Buttons.js'

const deepCopy = (arr) => {
    let copy = [];
    arr.forEach(elem => {
        if (Array.isArray(elem)) {
            //Recursive Call
            copy.push(deepCopy(elem))
        } else {
            copy.push(elem)
        }
    })

    return copy
}

class App extends React.Component {
    constructor() {
        super();
        this.speed = 100;
        this.rows = 30;
        this.cols = 30;

        this.state = {
            generations: 0,
            gridFull: Array(this.rows)
                .fill()
                .map(() => Array(this.cols).fill(false))
        };
    }

    componentDidMount() {
        this.seed();
    }

    selectBox = (row, col) => {
        const gridCopy = [...this.state.gridFull]

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (i === row && j === col) {
                    gridCopy[row][col] = !gridCopy[i][j]
                    console.log(gridCopy[i][j])
                    console.log(row, col)
                }
            }
        }

        this.setState({ ...this.state, gridFull: gridCopy });
    };

    seed = () => {
        const gridFull = this.state.gridFull.map(rowArr =>
            rowArr.map(() => Math.floor(Math.random() * 4) === 1)
        );
        this.setState(() => ({ gridFull }));
    };

    playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    };

    pauseButton = () => {
        clearInterval(this.intervalId);
    };

    slow = () => {
        this.speed = 1000;
        this.playButton();
    };

    fast = () => {
        this.speed = 100;
        this.playButton();
    };

    clear = () => {
        const gridFull = Array(this.rows)
            .fill()
            .map(() => Array(this.cols).fill(false));

        clearInterval(this.intervalId);

        this.setState(() => ({
            gridFull,
            generations: 0
        }));
    };

    gridSize = size => {
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
        this.clear();
    };

    play = () => {
        const g = this.state.gridFull;
        //spread operator cannot be used to clone an array instead the Array.from method must be used
        //spread operator does not work when we are trying to clone a nested array
        // Ref: https://www.samanthaming.com/tidbits/35-es6-way-to-clone-an-array/
        // Ref: https://medium.com/@ziyoshams/deep-copying-javascript-arrays-4d5fc45a6e3e
        //let g2 = arrayClone(this.state.gridFull);
        const g2 = deepCopy(this.state.gridFull)

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let count = 0;
                if (i > 0) if (g[i - 1][j]) count++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
                if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
                if (j < this.cols - 1) if (g[i][j + 1]) count++;
                if (j > 0) if (g[i][j - 1]) count++;
                if (i < this.rows - 1) if (g[i + 1][j]) count++;
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
                if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
                if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
                if (!g[i][j] && count === 3) g2[i][j] = true;
            }
        }
        this.setState({
            gridFull: g2,
            generations: this.state.generations + 1
        });
    };

    render() {
        return (
            <div>
                <h1>The Game of Life</h1>
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    slow={this.slow}
                    fast={this.fast}
                    clear={this.clear}
                    seed={this.seed}
                />
                <Grid
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
                <h2>Generations: {this.state.generations}</h2>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'))