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

function changeSquare(square, colour, eraserSelected) {
    if (eraserSelected) {
        square.style.backgroundColor = 'white';
    }
    else {
        square.style.backgroundColor = colour;
    }
}

function randomizeColour() {

}

function toggleEraser(eraserSelected) {
    return !eraserSelected;
}

function clearGrid() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.style.backgroundColor = 'white');
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
    
    squares.forEach(square => {
        square.addEventListener('mouseover', () =>{
            changeSquare(square, colour, eraserSelected)
        });
    });

    colourPicker.onchange =  e => {
        colour = e.target.value;
        console.log(colour);
    };

    rainbowButton.addEventListener('click', () => {
        console.log('Rainbow mode clicked!');
    });

    eraser.addEventListener('click', () => {
        eraserSelected = toggleEraser(eraserSelected);
    });

    clear.addEventListener('click', clearGrid);
}

main();