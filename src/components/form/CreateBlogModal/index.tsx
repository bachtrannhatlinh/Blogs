import React, { useState } from 'react';
import './styled.css';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const CreateBlogModal: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(formData);
    // Thực hiện hành động xử lý form ở đây, ví dụ như gửi dữ liệu tới server
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div className="form-result">
          <h2>Form Submitted</h2>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Password: {formData.password}</p>
        </div>
      )}
    </div>
  );
};

export default CreateBlogModal;
