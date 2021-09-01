import { createSlice } from '@reduxjs/toolkit';

//Everything should be blank/empty from the onset 
const initialState = {
    name: "",
    email: "",
    photo: ""
};

//When the user log in set the initial state with this 
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLoginDetails: (state, actions) => {
            state.name = actions.payload.name;
            state.email = actions.payload.email;
            state.photo = actions.payload.photo;
        },

        setSignOutState: state => {
            state.name = null
            state.email = null
            state.photo = null
        },
    },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

export const selectUserName = state => state.user.name;
export const selectUserEmail = state => state.user.email;
export const selectUserPhoto = state => state.user.photo;

export default userSlice.reducer;

