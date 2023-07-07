const GRID_SIDE_LENGTH = 500;
const MAX_SQUARES_IN_ROW = 100;
const DEFAULT_SIZE = 16;

/**
 * Create an n x n grid (where n is gridSize)
 * @param {number} gridSize Width and height of the grid
 */
function createGrid(gridSize) {
    const grid = document.querySelector(".grid-container");
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

/**
 * Remove squares from the grid DOM element
 */
function removeSquares() {
    const grid = document.querySelector(".grid-container");
    while(grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }
}

/**
 * Create a new grid of the appropriate grid size
 * @param {number} gridSize Size of new grid
 * @returns {NodeList} List of all squares in the new grid
 */
function resizeGrid(gridSize) {
    clearGrid();
    removeSquares();
    createGrid(gridSize);
    return document.querySelectorAll('.square');
}

/**
 * Change the colour of a square
 * @param {Element} square A DOM element representing a square in the grid
 * @param {string} colour New colour of the square
 * @param {boolean} eraserSelected True if the eraser is selected, false otherwise
 * @param {boolean} rainbowSelected True if rainbow mode is selected, false otherwise
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
 * Randomly choose RGB values to generate a random colour for a square
 * @param {Element} square A DOM element representing a square in the grid
 */
function randomizeColour(square) {
    const redValue = Math.floor(Math.random() * 255);
    const greenValue = Math.floor(Math.random() * 255);
    const blueValue = Math.floor(Math.random() * 255);
    square.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

/**
 * Sets all squares to white effectively clearing the grid
 */
function clearGrid() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.style.backgroundColor = 'white');
}

/**
 * Change the background colour of a button to indicate that it is selected
 * @param {Element} button A button DOM element
 * @param {boolean} selected True if the button is currently selected, false otherwise
 */
function changeButtonBackground(button, selected) {
    if (selected) {
        button.style.backgroundColor = 'gold';
    }
    else {
        button.style.backgroundColor = 'white';
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

    clear.addEventListener('click', () => {
        clearGrid();
        eraserSelected = false;
        changeButtonBackground(eraser, eraserSelected);
    });

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