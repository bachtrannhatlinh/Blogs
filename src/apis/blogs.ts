import { ApiResponse } from "../models"
import { GetListsBlogsParams, RespListsBlogs } from "../models/blogs"
import axiosClient from "./axiosClient"

const blogsApi = {
  getListBlogs(params: GetListsBlogsParams = {
    page: 0,
    offset: 0,
    search: "",
    sort_by: "",
    sort_direction: ""
  }): Promise<ApiResponse<RespListsBlogs>> {
    const url = '/api/v2/blogs'
    return axiosClient.get(url, { params })
  },
}
export default blogsApi