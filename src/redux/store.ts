import { configureStore } from '@reduxjs/toolkit'
import ListsBlogSlice from '../feature/ListsBlog/ListsBlogSlice'

const store = configureStore({
  reducer: {
    ListsBlog: ListsBlogSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
