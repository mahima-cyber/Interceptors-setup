import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, apiService } from "../../Service/Api";
import { deleteUsr, postUrl, updateUsr } from "../../Service/ApiEndpoints";

const initialState = {
    getApiStatus: false,
    getApi: "",
    getApiErr: "",
    addUserStatus: false,
    addUser: "",
    addUserErr: "",
    getDeleteStatus: false,
    getDelete:"",
    getDeleteErr:"",
    putApiStatus:false,
    putApi:"",
    putApiErr:""

}

export const getUser = createAsyncThunk('network/getUser',async(body,{ rejectWithValue , fulfillWithValue , dispatch})=>{
    const api = new Api();

    try{
        const response = await api.get(postUrl, body)
        return fulfillWithValue(response.data)
    }
    catch(error){
        if(error?.response?.data){
            return rejectWithValue(error.response.data)
        }
        else{
            return rejectWithValue(error)
        }
    } 
})

export const createUser = createAsyncThunk('network/createUser',async(body,{ rejectWithValue , fulfillWithValue , dispatch})=>{
    const api = new Api();
    try{
        const response = await api.post(postUrl, body)
        return fulfillWithValue(response.data)
    }
    catch(error){
        if(error?.response?.data){
            return rejectWithValue(error.response.data)
        }
        else{
            return rejectWithValue(error)
        }
    } 
})
export const deleteUser = createAsyncThunk('network/deleteUser',async(id,{ rejectWithValue , fulfillWithValue , dispatch})=>{
    const api = new Api();
    try{
        const response = await api.delete(`${deleteUsr}/${id}`)
        return fulfillWithValue(response.data)
    }
    catch(error){
        if(error?.response?.data){
            return rejectWithValue(error.response.data)
        }
        else{
            return rejectWithValue(error)
        }
    } 
})
export const updateUser = createAsyncThunk('network/updateUser',async(body,{ rejectWithValue , fulfillWithValue , dispatch})=>{
    const api = new Api();
    try{
        const response = await api.put(`${updateUsr}/${body.id}`)
        return fulfillWithValue(response.data)
    }
    catch(error){
        if(error?.response?.data){
            return rejectWithValue(error.response.data)
        }
        else{
            return rejectWithValue(error)
        }
    } 
})
const userSlice = createSlice({
    name: 'netwok',
    initialState,
    reducers: {
        changeStatus(state, action) {
            state.getApi = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, action) => {
                state.getApiStatus = 'loading'
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.getApiStatus = "succeeded"
                state.getApi = action?.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.getApiStatus = "failed";
                state.getApiErr = action.payload;
            })
            .addCase(createUser.pending, (state, action) => {
                state.addUserStatus = 'loading'
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.addUserStatus = "succeeded"
                state.addUser = action?.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.addUserStatus = "failed";
                state.addUserErr = action.payload;
            })
            .addCase(deleteUser.pending, (state, action) => {
                state.getDeleteStatus = 'loading'
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.getDeleteStatus = "succeeded"
                state.getDelete = action?.payload;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.getDeleteStatus = "failed";
                state.getDeleteErr = action.payload;
            })
            .addCase(updateUser.pending, (state, action) => {
                state.putApiStatus = 'loading'
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.putApiStatus = "succeeded"
                state.putApi = action?.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.putApiStatus = "failed";
                state.putApiErr = action.payload;
            })
               }
})
export const { changeStatus } = userSlice.actions;

export default userSlice.reducer;
