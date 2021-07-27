import { useState } from "react";
import style from "./style.module.scss";

function Creation({ newMap }) {
  //each input should be a component
  const [map, setMapData] = useState({ rows: 10, columns: 10, mines: 10 });

  function handleChange(e) {
    //function that saves data in state, it's more performant if we have 3 different states (rows, columns, mines)
    const { name, valueAsNumber } = e.target;

    setMapData({ ...map, [name]: valueAsNumber });
  }

  function handleClick() {
    //we send with the callback, de newData
    newMap(map);
  }

  return (
    <div className={style.creation}>
      <div className={style.inputContainer}>
        <label className={style.label}>Filas</label>
        <input
          type="number"
          min="1"
          value={map.rows}
          name="rows"
          onChange={handleChange}
        />
      </div>
      <div className={style.inputContainer}>
        <label className={style.label}>Columnas</label>
        <input
          type="number"
          min="1"
          value={map.columns}
          name="columns"
          onChange={handleChange}
        />
      </div>
      <div className={style.inputContainer}>
        <label className={style.label}>Minas</label>
        <input
          type="number"
          min="1"
          value={map.mines}
          name="mines"
          onChange={handleChange}
        />
      </div>
      <button onClick={handleClick} className={style.button}>
        Crear
      </button>
    </div>
  );
}

export default Creation;
