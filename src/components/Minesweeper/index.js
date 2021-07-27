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
  //status of the game, can be: start, inprogress, lose.
  const [developerMode, setDeveloperMode] = useState(false);

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

  function changeGameStatus(status) {
    setGameStatus(status);
  }

  function changeMap(newMap) {
    //we set the new map data
    setMap(newMap);
    //we change gameStatus so that the matrix is generated again
    setGameStatus("start");
  }

  function handleDeveloperMode() {
    setDeveloperMode((prev) => !prev);
  }

  return (
    <>
      <Creation newMap={changeMap} developerMode={handleDeveloperMode} />
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
                    changeGameStatus={changeGameStatus}
                    gameStatus={gameStatus}
                    developerMode={developerMode}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <Message changeGameStatus={changeGameStatus} map={map} />
    </>
  );
}

export default Map;
