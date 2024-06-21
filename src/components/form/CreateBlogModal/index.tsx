import React, { useState } from "react";
import "./styled.css";
import blogsApi from "../../../apis/blogs";
import { handleAsyncRequest } from "../../../utils/helper";

interface FormData {
  title: string;
  content: string;
  image: File | null;
}

interface CreateBlogModalProps {
  onClose: () => void
}

export default function CreateBlogModal({onClose}: CreateBlogModalProps){
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    image: null,
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const formDataToSend = new FormData()
    formDataToSend.append('blog[title]', formData.title);
    formDataToSend.append('blog[content]', formData.content);
    if (formData.image) {
      formDataToSend.append('blog[image]', formData.image);
    }
    const [error, result] = await handleAsyncRequest(blogsApi.createBlog(formDataToSend))
    if (result) {
      onClose()
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">title</label>
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
          <label htmlFor="password">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div className="form-result">
          <h2>Form Submitted</h2>
          <p>Name: {formData.title}</p>
          <p>Email: {formData.content}</p>
          <p>Password: {formData.title}</p>
        </div>
      )}
    </div>
  );
};
