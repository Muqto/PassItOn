import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/slice'
import isLoadingReducer from './isLoading/slice'
import itemsReducer from './Items/slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    isLoading: isLoadingReducer,
    items: itemsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch