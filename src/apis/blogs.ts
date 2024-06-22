import { ApiResponse } from "../models"
import { GetListsBlogsParams, RespCreatedBlog, RespDetailBlog, RespListsBlogs } from "../models/blogs"
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

  createBlog(params: FormData): Promise<ApiResponse<RespCreatedBlog>> {
    const url = '/api/v2/blogs'
    return axiosClient.post(url, params, { headers: { 'Content-Type': 'multipart/form-data' } })
  },

  getBlogById(id?: string | number): Promise<ApiResponse<RespDetailBlog>> {
    const url = `/api/v2/blogs/${id}`
    return axiosClient.get(url)
  },

  updateBlog(param: { id: string | number, body: FormData }): Promise<ApiResponse<RespDetailBlog>> {
    const url = `/api/v2/blogs/${param.id}`
    return axiosClient.put(url, param.body, { headers: { 'Content-Type': 'multipart/form-data' } })
  },

}
export default blogsApi