import { useState, useEffect } from "react";
import style from "./style.module.scss";

function Cell({ row, column, value, gameStatus, lose, counter }) {
  const [clicked, setClicked] = useState(false);
  const [flag, setFlag] = useState(false);
  const [color, setColor] = useState("lightgrey");

  useEffect(() => {
    if (clicked && !flag && value === "bomb") {
      //if we click on a bomb we lose
      lose();
    }
  }, [clicked, flag, value, lose]);

  useEffect(() => {
    //if gameStatus changes from lose, we restart all cells
    if (gameStatus !== "lose") {
      setClicked(false);
      setFlag(false);
      setColor("lightgrey");
    }
  }, [gameStatus]);

  function handleClick() {
    if (!clicked && !flag) {
      // if it was not clicked, and there is no flag set as clicked
      setClicked(true);
      //sending callback click
      counter();

      //logic to set different colors based on value
      if (value === "bomb") {
        setColor("red");
      } else if (typeof value === "number") {
        setColor("yellow");
      }
    }
  }

  function handleContextMenu(e) {
    //disable context menu
    e.preventDefault();

    if (!clicked) {
      //if it was not clicked, change flag status
      setFlag((prevFlag) => !prevFlag);
    }
  }

  return (
    <button
      id={`${row}_${column}`}
      className={clicked && !flag ? `${style.cell} ${style.show}` : style.cell}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      style={clicked && !flag ? { color: color } : {}}
    >
      {clicked && !flag && value && <p>{value === "bomb" ? "💣" : value}</p>}

      {flag && <span className={style.flag}>🚩</span>}
    </button>
  );
}

export default Cell;
