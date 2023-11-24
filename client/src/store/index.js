import createEventReducer from './reducer'

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        eventPopUP: createEventReducer
    }
})