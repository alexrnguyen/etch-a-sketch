const GRID_SIDE_LENGTH = 500;
const MAX_SQUARES_IN_ROW = 100;

function createGrid(gridSize) {
    const grid = document.querySelector(".grid-container");
    // Create an n x n grid (where n is gridSize)
    for(let i = 0; i < gridSize; i++) {
        const row = document.createElement('div')
        row.classList.add('row')
        for(let j = 0; j < gridSize; j++) {
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

function randomizeColour(square) {
    const redValue = Math.floor(Math.random() * 255);
    const greenValue = Math.floor(Math.random() * 255);
    const blueValue = Math.floor(Math.random() * 255);
    square.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

function clearGrid() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.style.backgroundColor = 'white');
}

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

    const grid = document.querySelector(".grid-container");
    let gridSize = 16;

    createGrid(gridSize);

    const squares = document.querySelectorAll('.square');
    let eraserSelected = false;
    let rainbowSelected = false;
    
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
}

main();