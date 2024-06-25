import React from "react";
import { ItemListsBlogs } from "../../../../models/blogs";
import { Link } from "react-router-dom";

interface BtnBlogItemProps {
  item: ItemListsBlogs;
  onOpenModalUpdate: (id: number) => void;
}

const BtnBlogItem: React.FC<BtnBlogItemProps> = ({ item, onOpenModalUpdate }) => {
  return (
    <>
      <div className="d-grid">
        <button className="btn mt-2 btn-secondary">
          <Link to={`/blog/${item.id}`} className="link-detail-page">
            Blog detail page
          </Link>
        </button>
        <button
          className="btn mt-2 btn-secondary link-detail-page"
          onClick={() => onOpenModalUpdate(item.id)}
        >
          Edit Blog
        </button>
      </div>
    </>
  );
};

export default BtnBlogItem;
