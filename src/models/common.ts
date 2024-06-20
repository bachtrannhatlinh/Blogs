export interface ApiResponse<T = any> {
  data: T
  code: number
  message?: string
}