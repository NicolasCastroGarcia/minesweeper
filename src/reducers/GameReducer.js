import { createSlice } from "@reduxjs/toolkit";

export const CounterReducer = createSlice({
  name: "game",
  initialState: {
    clicks: 0,
    mine: false
  },
  reducers: {
    increment: (state) => {
      state.clicks += 1;
    },
    setMine: (state, action) => {
      state.mine = action.payload;
    },
    setClicks: (state, action) => {
      state.clicks = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { increment, setMine, setClicks } = CounterReducer.actions;

export default CounterReducer.reducer;
