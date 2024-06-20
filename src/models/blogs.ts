export interface GetTopParams {
  limit?: number
  yearMonth?: string
}

export interface GetListsBlogsParams {
  page: number
  offset: number
  search: string
  sort_by: string
  sort_direction: string
}

export interface RespListsBlogs {
  data: {
    items: [
      {
        comments_count: number,
        content: string,
        created_at: Date,
        id: number,
        image: {
          url: string
        },
        title: string,
        updated_at: Date
      }
    ],
    pagination: {
      count: number,
      page: number,
      offset: string
      total: number,
      prev: number,
      next: number
    }
  },
}
