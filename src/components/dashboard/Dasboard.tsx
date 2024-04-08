"use client"
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import DasboardNavPc from './DasboardNavPc'


const Dasboard = () => {

  return (
    <div>
      <div className=' xl:hidden'>
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className=" hidden xl:block ">
        <DasboardNavPc />
      </div>
    </div>
  )
}

export default Dasboard



// {/* <TabsContent value="overview" className="bg-gray-800 p-6 rounded-b-lg text-white">
// {/* Overview content */}
// </TabsContent>
// <TabsContent value="category" className="bg-gray-800 p-6 rounded-b-lg text-white">
// <Category />
// </TabsContent>
// <TabsContent value="sub-category" className="bg-gray-800 p-6 rounded-b-lg text-white">
// <SubCategory />
// </TabsContent>
// <TabsContent value="addProduct" className="bg-gray-800 p-6 rounded-b-lg text-white">
// <Product />
// </TabsContent>
// <TabsContent value="manageProduct" className="bg-gray-800 p-6 rounded-b-lg text-white">
// <GetManageProducts />
// </TabsContent>
// <TabsContent value="manageOrders" className="bg-gray-800 p-6 rounded-b-lg text-white">
// {/* Manage Orders content */}
// </TabsContent> */}