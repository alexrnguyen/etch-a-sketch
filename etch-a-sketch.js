const GRID_SIDE_LENGTH = 500;
const MAX_SQUARES_IN_ROW = 100;
const DEFAULT_SIZE = 16;
/**
 * 
 * @param {*} gridSize 
 */
function createGrid(gridSize) {
    const grid = document.querySelector(".grid-container");
    // Create an n x n grid (where n is gridSize)
    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('div')
        row.classList.add('row')
        for (let j = 0; j < gridSize; j++) {
            const square = document.createElement('div');
            square.classList.add('square')
            square.style.backgroundColor = 'white';
            const sideLength = GRID_SIDE_LENGTH/gridSize;
            square.style.width = `${sideLength}px`;
            square.style.height = `${sideLength}px`;
            row.appendChild(square);
        }
        grid.appendChild(row);
    }
}

function removeSquares() {
    const grid = document.querySelector(".grid-container");
    while(grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }
}

function resizeGrid(gridSize) {
    clearGrid();
    removeSquares();
    createGrid(gridSize);
    return document.querySelectorAll('.square');
}

/**
 * 
 * @param {*} square 
 * @param {*} colour 
 * @param {*} eraserSelected 
 * @param {*} rainbowSelected 
 */
function changeSquare(square, colour, eraserSelected, rainbowSelected) {
    if (eraserSelected) {
        square.style.backgroundColor = 'white';
    }
    else if (rainbowSelected) {
        randomizeColour(square);
    }
    else {
        square.style.backgroundColor = colour;
    }
}

/**
 * 
 * @param {*} square 
 */
function randomizeColour(square) {
    const redValue = Math.floor(Math.random() * 255);
    const greenValue = Math.floor(Math.random() * 255);
    const blueValue = Math.floor(Math.random() * 255);
    square.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

/**
 * 
 */
function clearGrid() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.style.backgroundColor = 'white');
}

/**
 * 
 * @param {*} button 
 * @param {*} selected 
 */
function changeButtonBackground(button, selected) {
    if (selected) {
        button.style.backgroundColor = 'yellow';
    }
    else {
        button.style.backgroundColor = 'gray';
    }
}

function main() {
    const colourPicker = document.querySelector(".colour-picker");
    let colour = 'black';

    // Buttons
    const rainbowButton = document.querySelector(".rainbow-mode");
    const eraser = document.querySelector(".eraser");
    const clear = document.querySelector(".clear");

    const sizeHeader = document.querySelector(".slider-header");
    const sizeSlider = document.querySelector(".slider");

    let gridSize = DEFAULT_SIZE;
    sizeSlider.value = gridSize;
    sizeHeader.textContent = `${gridSize}x${gridSize}`;


    const grid = document.querySelector(".grid-container");

    createGrid(gridSize);

    let squares = document.querySelectorAll('.square');
    let eraserSelected = false;
    let rainbowSelected = false;

    // Event Listeners
    squares.forEach(square => {
        square.addEventListener('mouseover', () =>{
            changeSquare(square, colour, eraserSelected, rainbowSelected)
        });
    });

    colourPicker.onchange =  e => {
        colour = e.target.value;
        console.log(colour);
    };

    rainbowButton.addEventListener('click', () => {
        rainbowSelected = !rainbowSelected;
        changeButtonBackground(rainbowButton, rainbowSelected);
    });

    eraser.addEventListener('click', () => {
        eraserSelected = !eraserSelected;
        changeButtonBackground(eraser, eraserSelected);
    });

    clear.addEventListener('click', clearGrid);

    sizeSlider.oninput = e => {
        gridSize = e.target.value;
        sizeHeader.textContent = `${gridSize}x${gridSize}`;
    }

    sizeSlider.onchange = e => {
        squares = resizeGrid(gridSize);
        squares.forEach(square => {
            square.addEventListener('mouseover', () =>{
                changeSquare(square, colour, eraserSelected, rainbowSelected)
            });
        });
    }
}

main();