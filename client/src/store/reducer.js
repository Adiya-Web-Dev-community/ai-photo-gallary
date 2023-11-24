import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    createEventData: {}
}

const createEventSlice = createSlice({
    name: 'eventPopUP',
    initialState,
    reducers: {
        getCreateEventData: (state, { payload }) => {
            state.createEventData = payload
        }
    }
})

export default createEventSlice.reducer
export const { getCreateEventData } = createEventSlice.actions