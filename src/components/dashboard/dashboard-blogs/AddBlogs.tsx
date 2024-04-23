import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBlogs = () => {
  const [formData, setFormData] = useState({
    title: '',
    sum1: '',
    sum2: '',
    sum3: '',
    description: '',
    image: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/blogs', formData);
      if (response.status === 201) {
        toast.success('Blog created successfully!');
        setFormData({
          description: "",
          title: "",
          sum1: "",
          sum2: "",
          sum3: "",
          image: ""
        })
      } else {
        toast.error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while creating the blog');
    }
  };

  return (
    <div className="bg-slate-900 text-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Create Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-gray-800 rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="sum1" className="mb-1">Summary 1:</label>
          <input
            type="text"
            id="sum1"
            name="sum1"
            value={formData.sum1}
            onChange={handleChange}
            className="bg-gray-800 rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="sum2" className="mb-1">Summary 2:</label>
          <input
            type="text"
            id="sum2"
            name="sum2"
            value={formData.sum2}
            onChange={handleChange}
            className="bg-gray-800 rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="sum3" className="mb-1">Summary 3:</label>
          <input
            type="text"
            id="sum3"
            name="sum3"
            value={formData.sum3}
            onChange={handleChange}
            className="bg-gray-800 rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="bg-gray-800 rounded px-3 py-2 h-32"
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="mb-1">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="bg-gray-800 rounded px-3 py-2"
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Blog
        </button>
      </form>
    </div>

  );
};

export default AddBlogs;