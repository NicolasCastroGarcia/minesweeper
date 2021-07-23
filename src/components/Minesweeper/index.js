import { useState, useEffect } from "react";
import style from "./style.module.scss";
import { createNewGame } from "../../utils/utils";
import Cell from "../Cell";
import Message from "../Message";
import Creation from "../Creation";

function Map() {
  const [game, setGame] = useState(null);
  //contains the matrix of the minesweeper
  const [map, setMap] = useState({ row: 10, columns: 10, mines: 10 });
  //parameters that generate the matrix
  const [gameStatus, setGameStatus] = useState("start");
  //status of the game, can be: start, inprogress, win, lose.
  const [cellsClicked, setCellsClicked] = useState(0);

  useEffect(() => {
    //this useEfect watches gamestatus and executes the function if gameStatus is start
    if (gameStatus === "start") {
      newGame();
    }
  }, [gameStatus]);

  useEffect(() => {
    //this useEffect watches the number of cells clicked, if you click all the safe cells you win
    //safe cells are, total cells - mines

    //this is not performant because it's updating the whole component each time a cell is clicked
    if (cellsClicked === map.rows * map.columns - map.mines) {
      setGameStatus("win");
    }
  }, [cellsClicked, map]);

  function newGame() {
    //this functions creates the matrix, starts the game, and resets the click counter
    setCellsClicked(0);
    const newGame = createNewGame(map);
    setGameStatus("inprogress");
    setGame(newGame);
  }

  function restart() {
    //this is a callback function that changes status to start
    setGameStatus("start");
  }

  function handleLose() {
    //this is a callback function that is executed when you click on a mine
    setGameStatus("lose");
  }

  function handleClickCount() {
    //this is a callback function that counts how many cells are clicked
    setCellsClicked((prev) => prev + 1);
  }

  function changeMap(newMap) {
    //we set the new map data
    setMap(newMap);
    //we change gameStatus so that the matrix is generated again
    setGameStatus("start");
  }

  return (
    <>
      <Creation newMap={changeMap} />
      <div className={style.map}>
        {game?.map((row, rowNumber) => {
          return (
            <div key={rowNumber} className={style.row}>
              {row.map((column, columnNumber) => {
                return (
                  <Cell
                    key={columnNumber}
                    row={rowNumber}
                    column={columnNumber}
                    value={column}
                    gameStatus={gameStatus}
                    lose={handleLose}
                    counter={handleClickCount}
                  />
                );
              })}
            </div>
          );
        })}
        {(gameStatus === "lose" || gameStatus === "win") && (
          <Message status={gameStatus} restart={restart} />
        )}
      </div>
    </>
  );
}

export default Map;
