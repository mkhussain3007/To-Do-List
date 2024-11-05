import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'



let todoSlice=createSlice({
    name:'todo',
    initialState:{
        userName:'',
        todoList:[]
    },
    reducers:{},
    extraReducers:{
        }
    }
)

export const {}=todoSlice.actions;
export default todoSlice.reducer
