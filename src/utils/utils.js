export function generateMatrix(row, columns) {
  //creating an empty array of n rows, each row will have n number of columns that will be filled with an empty string
  return Array(row)
    .fill()
    .map(() => Array(columns).fill(""));
}

export function addBombs(matrix, bombs) {
  //function that randomly populates the matrix with bombs

  let rows = matrix.length;
  let cols = matrix[0].length;

  Array.from(Array(bombs)).forEach((bomb) => {
    let y = generateRandomNumber(rows);
    let x = generateRandomNumber(cols);
    if (!matrix[y][x]) {
      return (matrix[y][x] = "bomb");
    }
    return;
  });

  //this is the best way to do it, but using forEach so that I can show that I know how it works

  // for (let i = bombs; i > 0; i--) {
  //   let y = floorRand(rows);
  //   let x = floorRand(cols);
  //   if (!matrix[y][x]) {
  //     matrix[y][x] = "bomb";
  //   }
  // }

  return matrix;
}

export function addHints(matrix) {
  //better performance, less legibility

  //   for (let i = 0; i < matrix.length; i++) {
  //     for (let j = 0; j < matrix[0].length; j++) {
  //       if (matrix[i][j] === "bomb") {
  //         matrix = addOneNestedArrAdjacents(matrix, i, j, "bomb");
  //       }
  //     }
  //   }

  //worse performance, more legibility, I prefer legibility over performance

  matrix.forEach((row, rowPosition) => {
    row.forEach((column, columnPosition) => {
      if (column === "bomb") {
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
        if (matrix[a][b] !== undefined && matrix[a][b] !== "bomb") {
          //we need to validate undefined in case the bomb is on an edge and there is no number to show next to it because it would fall outside of the matrix
          //we need to validate that the cell it's not a bomb so that we do not override the bomb value
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

export function createNewGame({ rows = 10, columns = 10, bombs = 10 }) {
  //should normalize inputs with typescript
  return addHints(addBombs(generateMatrix(rows, columns), bombs));
}