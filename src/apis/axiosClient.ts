import axios, { AxiosResponse } from 'axios'
import qs from 'qs'

import { configs } from '../apps'

const axiosClient = axios.create({
  baseURL: configs.baseApiUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: params => qs.stringify(params)
})


axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data)
    }

    return Promise.reject(error)
  }
)

export default axiosClient
