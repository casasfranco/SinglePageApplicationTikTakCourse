import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import apiConfig from '../config/api';

export const singUp = createAsyncThunk('user/singUp', async ({credentials}) => {
    //Async operation
    let response = await Axios.post(`${apiConfig.domain}/users`, {
        user: credentials
    })
    console.log(response);

    return response.data.user;
});

export const singIn = createAsyncThunk('user/singUp', async ({credentials}) => {
    //Async operation
    let response = await Axios.post(`${apiConfig.domain}/users/signin`, {
        user: credentials
    });

    return response.data.user;
});



let userReducer = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: ''
    },
    reducers: {
        logOut: (state) => {
            state.user = null;
        }
    },
    extraReducers: {    //son tan reducers como los de arriba solo q estos estan especificos para los estados de la promesa
        [singUp.pending]: (state, action) => {
            state.status = 'loading';
        },
        [singUp.fulfilled]: (state, action) => {
            state.user = action.payload;    //cualquier cosa retornada por el Thunk se asigna al objeto payload
            state.status = 'success';
        },
        [singUp.rejected]: (state, action) => {
            state.status = 'failed';
        },
        [singIn.pending]: (state, action) => {
            state.status = 'loading';
        },
        [singIn.fulfilled]: (state, action) => {
            state.user = action.payload;    //cualquier cosa retornada por el Thunk se asigna al objeto payload
            state.status = 'success';
        },
        [singIn.rejected]: (state, action) => {
            state.status = 'failed';
        }
    }
});

export const { logOut } = userReducer.actions;

export default userReducer.reducer;