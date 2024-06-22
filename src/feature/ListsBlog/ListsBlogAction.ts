import { createAsyncThunk } from '@reduxjs/toolkit'
import blogsApi from '../../apis/blogs';
import { GetListsBlogsParams } from '../../models/blogs';

export const fetchData = createAsyncThunk(
  'items/fetchData',
  async (params: GetListsBlogsParams, { rejectWithValue }) => {
    try {
      const response = await blogsApi.getListBlogs(params)
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.data)
    }
  }
)

export const createItem = createAsyncThunk(
  'items/createItem',
  async (params: FormData, { rejectWithValue }) => {
    try {
      const response = await blogsApi.createBlog(params)
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.data)
    }
  }
)

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async (param: { id: string | number, body: FormData }, { rejectWithValue }) => {
    try {
      const response = await blogsApi.updateBlog(param)
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.data)
    }
  }
)
