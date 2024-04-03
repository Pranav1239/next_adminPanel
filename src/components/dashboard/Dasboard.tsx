"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Category from './dashboard-category/Category'
import { ToastContainer } from 'react-toastify'
import SubCategory from './dasboard-subcategory/SubCategory'

const Dasboard = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <ToastContainer />

      <div className="container mx-auto px-4">
        <Tabs defaultValue="account" className="w-[1500px] mx-auto">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800 rounded-t-lg">
            <TabsTrigger value="overview" className="px-4 py-2 text-white hover:bg-gray-700 rounded-tl-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="category" className="px-4 py-2 text-white hover:bg-gray-700">
              Category
            </TabsTrigger>
            <TabsTrigger value="sub-category" className="px-4 py-2 text-white hover:bg-gray-700">
              Sub-Category
            </TabsTrigger>
            <TabsTrigger value="addProduct" className="px-4 py-2 text-white hover:bg-gray-700">
              Add-Product
            </TabsTrigger>
            <TabsTrigger value="manageProduct" className="px-4 py-2 text-white hover:bg-gray-700 rounded-tr-lg">
              Manage-Product
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="bg-gray-800 p-6 rounded-b-lg text-white">
            {/* Category content */}
          </TabsContent>
          <TabsContent value="category" className="bg-gray-800 p-6 rounded-b-lg text-white">
            <Category />
          </TabsContent>
          <TabsContent value="sub-category" className="bg-gray-800 p-6 rounded-b-lg text-white">
            <SubCategory />
          </TabsContent>
          <TabsContent value="addProduct" className="bg-gray-800 p-6 rounded-b-lg text-white">
            {/* Add-Product content */}
          </TabsContent>
          <TabsContent value="manageProduct" className="bg-gray-800 p-6 rounded-b-lg text-white">
            {/* Manage-Product content */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Dasboard