import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import Image from "next/image"

interface Blog {
  id: number;
  title: string;
  image: string;
  createdDate: string;
  description: string;
}

const GetBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response: AxiosResponse<{ blogs: Blog[] }> = await axios.get('/api/blogs');
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white text-black rounded-lg shadow-md overflow-hidden">
            <Image src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <FaRegCalendarAlt className="mr-1" />
                  {new Date(blog.createdDate).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  {/* Add logic to calculate reading time */}
                  view
                </span>
              </div>
              <p className="text-gray-700">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetBlogs;
