import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailer: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    trailerVideo: (state, action) => {
      state.trailer = action.payload;
    },
  },
});

export const { addNowPlayingMovies, trailerVideo } = moviesSlice.actions;

export default moviesSlice.reducer;
