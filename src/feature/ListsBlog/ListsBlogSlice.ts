import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ItemListsBlogs } from '../../models/blogs'

interface IItemListsBlogs {
  list: ItemListsBlogs[]
}

const initialState: IItemListsBlogs = {
  list: []
}

export const ListsBlogSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setListsBlog: (_, action: PayloadAction<IItemListsBlogs>) => {
      console.log(action.payload, 'action.payload')
      return action.payload
    },
    initDepList: (state) => {
      state.list = []
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     // search list
  // }
})

export const { setListsBlog } = ListsBlogSlice.actions

export default ListsBlogSlice.reducer

