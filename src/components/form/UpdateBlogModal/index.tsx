import React, { useEffect, useState } from "react";
import "./styled.css";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { updateItem } from "../../../feature/ListsBlog/ListsBlogAction";
import { handleAsyncRequest } from "../../../utils/helper";
import { ApiResponse } from "../../../models";
import { RespDetailBlog } from "../../../models/blogs";
import blogsApi from "../../../apis/blogs";
import LoadingSpinner from "../../loading-spinner";

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
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleEditBlog = async () => {
    const [error, respDetailBlog] = await handleAsyncRequest<ApiResponse<RespDetailBlog>>(
      blogsApi.getBlogById(idUpdate)
    );

    if (respDetailBlog) {
      setTimeout(() => {
        setFormData(respDetailBlog.data);
      }, 1000); // Thêm thời gian trễ giả lập 1 giây
    }
  };

  useEffect(() => {
    handleEditBlog();
  }, [idUpdate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    // Kiểm tra xem file có tồn tại hay không
    if (file) {
      setFormData((prevState) => ({ ...prevState, image: file }));
    } else {
      setFormData((prevState) => ({ ...prevState, image: null }));
    }
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
    let params = {
      id: idUpdate,
      body: formDataToSend
    }
    dispatch(updateItem(params));
    onClose();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Title</label>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

