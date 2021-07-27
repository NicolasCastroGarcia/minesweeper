import "./App.css";
import Minesweeper from "./components/Minesweeper";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Minesweeper />
      </div>
    </Provider>
  );
}

export default App;
