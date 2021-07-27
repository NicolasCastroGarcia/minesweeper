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

  useEffect(() => {
    //this useEfect watches gamestatus and executes the function if gameStatus is start
    if (gameStatus === "start") {
      newGame();
    }
  }, [gameStatus]);

  function newGame() {
    //this functions creates the matrix, starts the game
    const newGame = createNewGame(map);
    setGameStatus("inprogress");
    setGame(newGame);
  }

  function handleLose() {
    //this is a callback function that is executed when you click on a mine
    setGameStatus("lose");
  }

  function changeMap(newMap) {
    //we set the new map data
    setMap(newMap);
    //we change gameStatus so that the matrix is generated again
    setGameStatus("start");
  }

  function handleRestart() {
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
                    lose={handleLose}
                    gameStatus={gameStatus}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <Message start={handleRestart} map={map} />
    </>
  );
}

export default Map;
