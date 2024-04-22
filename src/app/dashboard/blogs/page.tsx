"use client"
import AddBlogs from '@/components/dashboard/dashboard-blogs/AddBlogs';
import GetBlogs from '@/components/dashboard/dashboard-blogs/GetBlogs';
import React, { useState } from 'react';

const Page = () => {
  const [activeTab, setActiveTab] = useState('getBlogs');

  const handleTabClick = (tab : any) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex mb-4">
        <button
          className={`py-2 px-4 rounded-t-lg ${
            activeTab === 'getBlogs' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabClick('getBlogs')}
        >
          Get Blogs
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg ${
            activeTab === 'addBlogs' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabClick('addBlogs')}
        >
          Add Blogs
        </button>
      </div>
      <div className="bg-white p-4 rounded-b-lg">
        {activeTab === 'getBlogs' && <GetBlogs />}
        {activeTab === 'addBlogs' && <AddBlogs />}
      </div>
    </div>
  );
};

export default Page;
