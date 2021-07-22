import style from "./style.module.scss";

function Message({ status, restart }) {
  //this component breakes accessibility because it doesn't changes focus to this. Instead, it keeps the focus in the minesweeper component

  function handleClick() {
    restart();
  }

  return (
    <div className={style.message}>
      <p>{status === "win" ? "GANASTE" : "PERDISTE"}</p>
      <button onClick={handleClick}>Volver a Jugar</button>
    </div>
  );
}

export default Message;
