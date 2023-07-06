const GRID_SIDE_LENGTH = 500;

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

function draw() {
    this.style.backgroundColor = 'black';
}

function randomizeColour() {

}

function erase() {

}

function clearGrid() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.style.backgroundColor = 'white');
}

function main() {
    
    // Buttons
    const colourPicker = document.querySelector(".colour-picker");
    const rainbowButton = document.querySelector(".rainbow-mode");
    const eraser = document.querySelector(".eraser");
    const clear = document.querySelector(".clear");

    const grid = document.querySelector(".grid-container");
    let gridSize = 16;

    createGrid(gridSize);

    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('mouseover', draw));

    colourPicker.addEventListener('click', () => {
        console.log('Colour picker clicked!');
    });

    rainbowButton.addEventListener('click', () => {
        console.log('Rainbow mode clicked!');
    });

    eraser.addEventListener('click', () => {
        console.log('Eraser clicked!');
    });

    clear.addEventListener('click', clearGrid);
}

main();