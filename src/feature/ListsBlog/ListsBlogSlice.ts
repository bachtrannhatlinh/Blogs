import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemListsBlogs, RespDetailBlog } from '../../models/blogs';
import { createItem, fetchData, updateItem } from './ListsBlogAction';

interface IItemListsBlogs {
  list: ItemListsBlogs[];
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  items?: RespDetailBlog[];
  error?: string | null;
}

const initialState: IItemListsBlogs = {
  list: [],
  status: 'idle',
  items: [],
  error: null,
};

export const ListsBlogSlice = createSlice({
  name: 'ListsBlogSlice',
  initialState,
  reducers: {
    setListsBlog: (state, action: PayloadAction<IItemListsBlogs>) => {
      state.list = action.payload.list;
      state.items = action.payload.items;
      state.status = action.payload.status;
      state.error = action.payload.error;
    },
    initDepList: (state) => {
      state.list = [];
    },
    addItem: (state, action) => {
      state.items?.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      //createItem
      .addCase(createItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.items) {
          state.items.push(action.payload);
        }
      })
      .addCase(createItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // fetchData
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.items;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //updateItem
      .addCase(updateItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.items) {
          state.items.push(action.payload);
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { setListsBlog, initDepList, addItem } = ListsBlogSlice.actions;

export default ListsBlogSlice.reducer;
