import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css'
import Grid from './components/Grid.js'

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

    render() {
        return (
            <div>
                <h1>Conway's Game of Life</h1>
                <Grid
                    initialGrid={this.state.initialGrid}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
                <h2></h2>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))