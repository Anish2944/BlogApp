import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme:'purple'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === 'purple' ? 'dark' : 'purple';
        },
    },
});
 export const {toggleTheme} = themeSlice.actions;
 export default themeSlice.reducer;