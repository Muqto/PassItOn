import { createSlice } from '@reduxjs/toolkit'
import { setSessionReducer } from './reducer'

export interface LoadingState {
    isSessionLoading: Boolean
}

export const initialLoadingState : LoadingState = {
    isSessionLoading: true
}

const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: initialLoadingState,
    reducers: {
      setSessionLoadingAction: setSessionReducer
    },
  })

// Action creators are generated for each case reducer function
export const { setSessionLoadingAction } = isLoadingSlice.actions

export default isLoadingSlice.reducer