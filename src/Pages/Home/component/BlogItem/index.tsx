import React from "react";
import { ItemListsBlogs } from "../../../../models/blogs";

interface BlogItemProps {
  item: ItemListsBlogs;
}

const BlogItem: React.FC<BlogItemProps> = ({item}) => {
  return (
    <>
      <img src={item.image.url} className="img-fluid" alt={item.title} />
      <div className="d-grid">
        <div className="media-body">
          <h2>{item.title}</h2>
          <p className="cut-text">{item.content}</p>
          <p>Comments: {item.comments_count}</p>
        </div>
      </div>
    </>
  );
}

export default BlogItem;