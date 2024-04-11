// Import necessary components from react and react-toastify
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import DasboardNavPc from './DasboardNavPc';
import 'react-toastify/dist/ReactToastify.css'; // Import stylesheet for react-toastify
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
  return (
    <>
      <div className='xl:hidden'>
        {/* Use Sheet component correctly */}
        <Sheet>
          {/* SheetTrigger is used to toggle the SheetContent visibility */}
          <SheetTrigger>Open</SheetTrigger>
          {/* SheetContent contains the content of the sheet */}
          <SheetContent className="w-[400px] sm:w-[540px]">
            {/* SheetHeader contains the title and description of the sheet */}
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
      <div className="xl:block">
        <DasboardNavPc />
      </div>
      {/* Render ToastContainer to display toast notifications */}
      <ToastContainer />
    </>
  );
}

export default Dashboard;
