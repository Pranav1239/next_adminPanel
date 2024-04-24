"use client"
// Import necessary components from react and react-toastify
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import DasboardNavPc from './DasboardNavPc';
import 'react-toastify/dist/ReactToastify.css'; // Import stylesheet for react-toastify
import { ToastContainer } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { DoorOpen, SlidersIcon } from 'lucide-react';

const Dashboard = () => {

  const { data: session } = useSession();
  console.log(session, "Dashboard")
  return (
    <>
      <div className='xl:hidden absolute'>
        <Sheet>
          {/* SheetTrigger is used to toggle the SheetContent visibility */}
          <SheetTrigger className='p-3'>
            <div className='bg-white p-3 rounded-md'>
              <DoorOpen />
            </div>
          </SheetTrigger>
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
      {/* Render DasboardNavPc inside the appropriate container */}
      <div className="hidden  xl:block">
        <DasboardNavPc />
      </div>
      {/* Render ToastContainer to display toast notifications */}
      <ToastContainer />
    </>
  );
}

export default Dashboard;
