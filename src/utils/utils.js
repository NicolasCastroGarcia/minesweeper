function generateMatrix(row, columns) {
  //creating an empty array of n rows, each row will have n number of columns that will be filled with an empty string
  return Array(row)
    .fill()
    .map(() => Array(columns).fill(""));
}

function addMines(matrix, mines) {
  //function that randomly populates the matrix with mines
  const rows = matrix.length;
  const cols = matrix[0].length;
  let minesQuantity = mines;

  if (rows * cols < minesQuantity) {
    //we do this to avoid more mines than necessary
    minesQuantity = rows * cols;
  }

  Array.from(Array(minesQuantity)).forEach(() => {
    let x = generateRandomNumber(cols);
    let y = generateRandomNumber(rows);
    return checkForMine(matrix, x, y);
  });

  return matrix;
}

function checkForMine(matrix, x, y) {
  //abusing recursivity to add the right amount of mines
  let newX = x;
  let newY = y;

  const rows = matrix.length;
  const cols = matrix[0].length;

  if (matrix[y][x] == "mine") {
    newX = generateRandomNumber(cols);
    newY = generateRandomNumber(rows);

    return checkForMine(matrix, newX, newY);
  } else {
    return (matrix[newY][newX] = "mine");
  }
}

function addHints(matrix) {
  //better performance, less legibility

  //   for (let i = 0; i < matrix.length; i++) {
  //     for (let j = 0; j < matrix[0].length; j++) {
  //       if (matrix[i][j] === "mine") {
  //         matrix = addOneNestedArrAdjacents(matrix, i, j, "mine");
  //       }
  //     }
  //   }

  //worse performance, more legibility, I prefer legibility over performance

  matrix.forEach((row, rowPosition) => {
    row.forEach((column, columnPosition) => {
      if (column === "mine") {
        matrix = filledMatrix(matrix, rowPosition, columnPosition);
      }
    });
  });

  return matrix;
}

function filledMatrix(matrix, rowPosition, columnPosition) {
  //we create 2 arrays that contains 3 values each. Each value is filled according to the position (row and column) respective
  // to the cell coordinates (rowPosition, columnPosition)

  let rows = [rowPosition - 1, rowPosition, rowPosition + 1];
  let columns = [columnPosition - 1, columnPosition, columnPosition + 1];

  for (let a of rows) {
    if (matrix[a]) {
      for (let b of columns) {
        if (matrix[a][b] !== undefined && matrix[a][b] !== "mine") {
          //we need to validate undefined in case the mine is on an edge and there is no number to show next to it because it would fall outside of the matrix
          //we need to validate that the cell it's not a mine so that we do not override the mine value
          //and then, we add a value to that cell, based on the surrounding cells
          matrix[a][b]++;
        }
      }
    }
  }

  return matrix;
}

function generateRandomNumber(scale) {
  return Math.floor(Math.random() * scale);
}

export function createNewGame({ rows = 10, columns = 10, mines = 10 }) {
  //should normalize inputs with typescript
  return addHints(addMines(generateMatrix(rows, columns), mines));
}
