import { createSlice } from "@reduxjs/toolkit";

//Everything should be blank/empty from the onset 
const initialState = {
    recommend: null,
    newDisneys: null,
    originals: null,
    trending: null
};

const movieSlice = createSlice({
    name: 'movie:',
    initialState: initialState,
    reducers: {
        setMovies: (state, action) => {
            state.recommend = action.payload.recommend;
            state.newDisneys = action.payload.newDisneys;
            state.originals = action.payload.originals;
            state.trending = action.payload.trending;
        },
    },
});

export const { setMovies } = movieSlice.actions;

export const selectRecommend = state => state.movie.recommend;
export const selectNewDisney = state => state.movie.newDisneys;
export const selectOriginals = state => state.movie.originals;
export const selectTrending = state => state.movie.trending;

export default movieSlice.reducer;
