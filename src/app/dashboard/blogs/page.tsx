"use client"
import AddBlogs from '@/components/dashboard/dashboard-blogs/AddBlogs';
import GetBlogs from '@/components/dashboard/dashboard-blogs/GetBlogs';
import React, { useState } from 'react';

const Page = () => {
  const [activeTab, setActiveTab] = useState('getBlogs');

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div className=" mx-auto mt-10">
      <div className="flex mb-4">
        <button
          className={`py-2 px-4  ${activeTab === 'getBlogs' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-white'
            }`}
          onClick={() => handleTabClick('getBlogs')}
        >
          Get Blogs
        </button>
        <button
          className={`py-2 px-4  ${activeTab === 'addBlogs' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-white  '
            }`}
          onClick={() => handleTabClick('addBlogs')}
        >
          Add Blogs
        </button>
      </div>
      <div className="bg-slate-900 text-white p-4 rounded-b-lg">
        {activeTab === 'getBlogs' && <GetBlogs />}
        {activeTab === 'addBlogs' && <AddBlogs />}
      </div>
    </div>
  );
};

export default Page;
