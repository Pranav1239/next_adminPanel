"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const Appbar = () => {
  const pathname = usePathname();

  if (pathname === "/dashboard") {
    return null;
  }

  if (pathname === "/dashboard/category") {
    return null;
  }

  if (pathname === "/dashboard/manage-product") {
    return null;
  }

  if (pathname === "/dashboard/sub-cat") {
    return null;
  }

  if (pathname === "/dashboard/users") {
    return null;
  }



  if (pathname === "/dashboard/add-product") {
    return null;
  }


  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <Link className="text-gray-800 hover:text-sky-400 transition-colors" href="/">
        Home
      </Link>
      <Link className="text-gray-800 hover:text-sky-400 transition-colors" href="/profile">
        User Profile
      </Link>
      <Link className="text-gray-800 hover:text-sky-400 transition-colors" href="/dashboard">
        Dashboard
      </Link>
      {/* <SigninButton /> */}
    </header>
  );
};

export default Appbar;