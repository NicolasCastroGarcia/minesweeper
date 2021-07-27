import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { increment, setMine } from "../../reducers/GameReducer";
import style from "./style.module.scss";

function Cell({
  row,
  column,
  value,
  changeGameStatus,
  gameStatus,
  developerMode
}) {
  //initial state
  const [clicked, setClicked] = useState(false);
  const [flag, setFlag] = useState(false);
  const [color, setColor] = useState("yellow");
  //redux
  const dispatch = useDispatch();

  useEffect(() => {
    //this useEffect is excecuted each time the state or value changes
    if (clicked && !flag && value === "mine") {
      dispatch(setMine(true));
      changeGameStatus("lose");
    }
  }, [clicked, flag, value]);

  useEffect(() => {
    //if gameStatus is start, we restart all states
    if (gameStatus === "start") {
      setClicked(false);
      setFlag(false);
      setColor("yellow");
    }
  }, [gameStatus, value]);

  function handleClick() {
    if (!clicked && !flag) {
      // if it was not clicked, and there is no flag set as clicked
      setClicked(true);

      dispatch(increment());

      //logic to set different colors based on value
      if (value === 2) {
        setColor("darkorange");
      }
      if (value > 2) {
        setColor("red");
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
      {!developerMode && clicked && !flag && value && (
        <p>{value === "mine" ? "💣" : value}</p>
      )}
      {flag && <span className={style.flag}>🚩</span>}
      {developerMode && value}
    </button>
  );
}

export default Cell;
