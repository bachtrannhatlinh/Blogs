import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleAsyncRequest } from "../../utils/helper";
import { ApiResponse } from "../../models";
import { RespDetailBlog } from "../../models/blogs";
import blogsApi from "../../apis/blogs";

import "./styled.scss";
import LoadingSpinner from "../../components/loading-spinner";

const BlogDetail = () => {
  const [respDetailBlog, setRespDetailBlog] = useState<RespDetailBlog>() as any;

  let { id } = useParams();

  const handleEditBlog = async () => {
    const [error, respDetailBlog] = await handleAsyncRequest<
      ApiResponse<RespDetailBlog>
    >(blogsApi.getBlogById(id));

    if(respDetailBlog) {
      setTimeout(() => {
        setRespDetailBlog(respDetailBlog?.data);
      }, 1000); // Thêm thời gian trễ giả lập 1 giây
    }
  };

  useEffect(() => {
    handleEditBlog();
  }, [id]);

  return (
    !respDetailBlog ? (
      <LoadingSpinner />
    ) : (
    <div className="blog-detail">
      <h1 className="title">{respDetailBlog?.title}</h1>
      <img
        src={respDetailBlog?.image.url}
        alt={"image blog detail"}
        className="blog-image"
      />
      <div className="content" dangerouslySetInnerHTML={{ __html: respDetailBlog?.content }}></div>
    </div>)
  );
};

export default BlogDetail;
