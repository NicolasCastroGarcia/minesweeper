import { configureStore } from "@reduxjs/toolkit";
import GameReducer from "./reducers/GameReducer";

export default configureStore({
  reducer: {
    game: GameReducer
  }
});
