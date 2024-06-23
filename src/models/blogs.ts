export interface GetTopParams {
  limit?: number;
  yearMonth?: string;
}

export interface GetListsBlogsParams {
  page: number;
  offset: number;
  search: string;
  sort_by: string;
  sort_direction: string;
}

export interface GetDetailBlogsParams {
  id: string;
}

export interface CreateBlog {
  title: string;
  content: string;
  image: File | null;
}

export interface RespListsBlogs {
    total: number;
    items: ItemListsBlogs[];
    pagination: {
      count: number;
      page: number;
      offset: string;
      total: number;
      prev: number;
      next: number;
    };
};


export interface ItemListsBlogs {
  comments_count: number;
  content: string;
  created_at: Date | string;
  id: number;
  image: {
    url: string;
  };
  title: string;
  updated_at: Date | string;
}

export interface RespDetailBlog {
  id?: number;
  title: string;
  content: string;
  image: File | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface RespCreatedBlog {
  id?: number;
  title: string;
  content: string;
  image: File | null;
  created_at: Date | null;
  updated_at: Date | null;
}
