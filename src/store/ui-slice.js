import { createSlice } from "@reduxjs/toolkit";

const intialUiState = {toggleUi:false, notification:null};

const uiSlice = createSlice({
    name:'ui',
    initialState:intialUiState,
    reducers:{
        switchUi(state){
            state.toggleUi = !state.toggleUi;
        },
        showNotification(state,action){
            state.notification ={status:action.payload.status,title: action.payload.title,message:action.payload.message}
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;