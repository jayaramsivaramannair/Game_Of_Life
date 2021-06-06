var rows = 38;
var cols = 100;

var playing = false;

var grid = new Array(rows); // Creates an array with a length of 38
var nextGrid = new Array(rows);

var timer;
var reproductionTime = 100;

//Loads when the app initializes. This will simply create the grid
function initializeGrids() {
    for (var i = 0; i < rows; i++) {
        grid[i] = new Array(cols); //Each row will contain 100 columns
        nextGrid[i] = new Array(cols);
    }
}

//When the clear button is clicked
function resetGrids() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) { //Resets the cells in each grid
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

function copyAndResetGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            //What is the purpose of this next grid??
            nextGrid[i][j] = 0;
        }
    }
}

// Initialize
function initialize() {
    createTable();
    initializeGrids();
    resetGrids();
    setupControlButtons();
}

// Lay out the board
function createTable() {
    var gridContainer = document.getElementById('gridContainer');
    if (!gridContainer) {
        // Throw error
        console.error("Problem: No div for the drid table!");
    }

    // This could be made a React component
    var table = document.createElement("table");

    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < cols; j++) {//
            var cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

function cellClickHandler() {
    var rowcol = this.id.split("_");
    var row = rowcol[0];
    var col = rowcol[1];

    var classes = this.getAttribute("class");
    if (classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        grid[row][col] = 0;
    } else {
        this.setAttribute("class", "live");
        grid[row][col] = 1;
    }

}

//This is used to set the attribute of live or dead on each cell
function updateView() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            //Gets each cell by its by id
            var cell = document.getElementById(i + "_" + j);
            if (grid[i][j] == 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live");
            }
        }
    }
}

function setupControlButtons() {
    // button to start
    var startButton = document.getElementById('start');
    startButton.onclick = startButtonHandler;

    // button to clear
    var clearButton = document.getElementById('clear');
    clearButton.onclick = clearButtonHandler;

    // button to set random initial state
    var randomButton = document.getElementById("random");
    randomButton.onclick = randomButtonHandler;
}

function randomButtonHandler() {
    if (playing) return;
    clearButtonHandler();
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var isLive = Math.round(Math.random());
            if (isLive == 1) {
                var cell = document.getElementById(i + "_" + j);
                cell.setAttribute("class", "live");
                grid[i][j] = 1;
            }
        }
    }
}

// clear the grid
function clearButtonHandler() {
    console.log("Clear the game: stop playing, clear the grid");

    playing = false;
    var startButton = document.getElementById('start');
    startButton.innerHTML = "Start";
    clearTimeout(timer);

    var cellsList = document.getElementsByClassName("live");
    // convert to array first, otherwise, you're working on a live node list
    // and the update doesn't work!
    var cells = [];
    for (var i = 0; i < cellsList.length; i++) {
        cells.push(cellsList[i]);
    }

    for (var i = 0; i < cells.length; i++) {
        cells[i].setAttribute("class", "dead");
    }
    resetGrids;
}

// start/pause/continue the game
function startButtonHandler() {
    if (playing) {
        console.log("Pause the game");
        playing = false;
        this.innerHTML = "Continue";
        clearTimeout(timer);
    } else {
        console.log("Continue the game");
        playing = true;
        this.innerHTML = "Pause";
        play();
    }
}

// run the life game
function play() {
    computeNextGen();

    if (playing) {
        timer = setTimeout(play, reproductionTime);
    }
}

function computeNextGen() {
    // Loop through and apply the game of life rules to each cell
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            applyRules(i, j);
        }
    }

    // copy NextGrid to grid, and reset nextGrid
    copyAndResetGrid();
    // copy all 1 values to "live" in the table
    updateView();
}

// RULES
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function applyRules(row, col) {
    var numNeighbors = countNeighbors(row, col);
    //First check if the cell is live or not
    if (grid[row][col] == 1) {
        if (numNeighbors < 2) {
            nextGrid[row][col] = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3) {
            nextGrid[row][col] = 1;
        } else if (numNeighbors > 3) {
            nextGrid[row][col] = 0;
        }
    } else if (grid[row][col] == 0) {
        if (numNeighbors == 3) {
            nextGrid[row][col] = 1;
        }
    }
}

//Get the count of all live neighbors
function countNeighbors(row, col) {
    var count = 0;
    //Top Neighbor
    if (row - 1 >= 0) {
        //Checks if there are live or not
        if (grid[row - 1][col] == 1) count++;
    }
    //Diagonal Left Neighbor
    if (row - 1 >= 0 && col - 1 >= 0) {
        if (grid[row - 1][col - 1] == 1) count++;
    }
    //Diagonal Right Neighbor
    if (row - 1 >= 0 && col + 1 < cols) {
        if (grid[row - 1][col + 1] == 1) count++;
    }

    //left Neighbor
    if (col - 1 >= 0) {
        if (grid[row][col - 1] == 1) count++;
    }

    //Right Neighbor
    if (col + 1 < cols) {
        if (grid[row][col + 1] == 1) count++;
    }

    //Bottom Neighbor
    if (row + 1 < rows) {
        if (grid[row + 1][col] == 1) count++;
    }

    //Diagonal Bottom Left Neighbor
    if (row + 1 < rows && col - 1 >= 0) {
        if (grid[row + 1][col - 1] == 1) count++;
    }

    //Diagonal Bottom Right Neighbor
    if (row + 1 < rows && col + 1 < cols) {
        if (grid[row + 1][col + 1] == 1) count++;
    }

    return count;
}

// Start everything
window.onload = initialize;