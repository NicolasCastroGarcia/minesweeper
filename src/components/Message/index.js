import style from "./style.module.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMine, setClicks } from "../../reducers/GameReducer";

function Message({ changeGameStatus, map }) {
  //this component breaks accessibility because it doesn't changes focus to this. Instead, it keeps the focus in the minesweeper component
  const [status, setStatus] = useState(false);
  const game = useSelector((state) => state.game);

  const safeCells = map.rows * map.columns - map.mines;
  const dispatch = useDispatch();

  function handleClick() {
    //we restart the store, the status of this component, and send the callback so that the map is generated again
    setStatus(false);
    dispatch(setClicks(0));
    dispatch(setMine(false));
    changeGameStatus("start");
  }

  useEffect(() => {
    handleGame();
  }, [game]);

  function handleGame() {
    const { clicks, mine } = game;

    if (clicks == safeCells) {
      setStatus("win");
    }

    if (mine && status != "lose") {
      setStatus("lose");
    }
  }

  return (
    <>
      {status && (
        <div className={style.message}>
          <p>{status === "win" ? "GANASTE" : "PERDISTE"}</p>
          <button onClick={handleClick} className={style.button}>
            VOLVER A JUGAR
          </button>
        </div>
      )}
    </>
  );
}

export default Message;
