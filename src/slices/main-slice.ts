import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from 'src/store'

interface MainSlice {
    reference: any,
    page: any
}

const initialState: MainSlice = {
    reference: null,
    page: null
}


const fetchTable = createAsyncThunk(
    "main/fetch",
    async () => {

    }
)

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {

    }
})


export const {} = mainSlice.actions

export const selectReference = (state: RootState) => state.main.reference
export const selectPage = (state: RootState) => state.main.page

export default mainSlice.reducer
