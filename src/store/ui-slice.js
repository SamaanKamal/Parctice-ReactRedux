import { createSlice } from "@reduxjs/toolkit";

const intialUiState = {toggleUi:false};

const uiSlice = createSlice({
    name:'ui',
    initialState:intialUiState,
    reducers:{
        switchUi(state){
            state.toggleUi = !state.toggleUi;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;