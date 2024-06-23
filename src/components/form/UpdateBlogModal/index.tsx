import React, { useEffect, useState } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { updateItem } from "../../../feature/ListsBlog/ListsBlogAction";
import { handleAsyncRequest } from "../../../utils/helper";
import { ApiResponse } from "../../../models";
import { RespDetailBlog } from "../../../models/blogs";
import blogsApi from "../../../apis/blogs";
import LoadingSpinner from "../../loading-spinner";

import "./styled.scss";

interface FormData {
  title: string;
  content: string;
  image: File | null;
}

interface UpdateBlogModalProps {
  onClose: () => void;
  idUpdate: number;
}

export default function UpdateBlogModal({ onClose, idUpdate }: UpdateBlogModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    image: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleEditBlog = async () => {
    setLoading(true);
    const [error, respDetailBlog] = await handleAsyncRequest<ApiResponse<RespDetailBlog>>(
      blogsApi.getBlogById(idUpdate)
    );

    if (respDetailBlog) {
      setFormData({
        title: respDetailBlog.data.title,
        content: respDetailBlog.data.content,
        image: null, // Assuming the current image URL is not needed for the file input
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    handleEditBlog();
  }, [idUpdate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const formDataToSend = new FormData();
    formDataToSend.append("blog[title]", formData.title);
    formDataToSend.append("blog[content]", formData.content);
    if (formData.image) {
      formDataToSend.append("blog[image]", formData.image);
    }
    const params = {
      id: idUpdate,
      body: formDataToSend,
    };
    dispatch(updateItem(params));
    onClose();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <input
            type="text"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit" disabled={submitted}>Submit</button>
      </form>
    </div>
  );
}
