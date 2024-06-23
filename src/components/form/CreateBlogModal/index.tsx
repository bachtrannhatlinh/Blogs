import React, { useState } from "react";
import "./styled.scss";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { createItem } from "../../../feature/ListsBlog/ListsBlogAction";

interface FormData {
  title: string;
  content: string;
  image: {
    url: File | null;
  };
}

interface CreateBlogModalProps {
  onClose: () => void;
}

export default function CreateBlogModal({ onClose }: CreateBlogModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    image: {
      url: null,
    },
  });
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevState) => ({
      ...prevState,
      image: {
        url: file,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('blog[title]', formData.title);
    formDataToSend.append('blog[content]', formData.content);
    if (formData.image.url) {
      formDataToSend.append('blog[image]', formData.image.url);
    }
    dispatch(createItem(formDataToSend));
    onClose();
  };

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
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
