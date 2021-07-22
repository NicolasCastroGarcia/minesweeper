import { useState } from "react";
import style from "./style.module.scss";

function Creation({ newMap }) {
  //each input should be a component
  const [map, setMapData] = useState({ rows: 10, columns: 10, bombs: 10 });

  function handleChange(e) {
    //function that saves data in state, it's more performant if we have 3 different states (rows, columns, bombs)
    const { name, valueAsNumber } = e.target;
    setMapData({ ...map, [name]: valueAsNumber });
  }

  function handleClick() {
    //we sent with the callback, de newData
    newMap(map);
  }

  return (
    <div className={style.creation}>
      <div className={style.inputContainer}>
        <label>Filas</label>
        <input
          type="number"
          value={map.rows}
          name="rows"
          onChange={handleChange}
        />
      </div>
      <div className={style.inputContainer}>
        <label>Columnas</label>
        <input
          type="number"
          value={map.columns}
          name="columns"
          onChange={handleChange}
        />
      </div>
      <div className={style.inputContainer}>
        <label>Bombas</label>
        <input
          type="number"
          value={map.bombs}
          name="bombs"
          onChange={handleChange}
        />
      </div>
      <button onClick={handleClick} className={style.create}>
        Crear
      </button>
    </div>
  );
}

export default Creation;
