"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../public/logo.png";
import User from "./user/User";

const Appbar = () => {
  const pathname = usePathname();
  const hiddenPaths = [
    "/dashboard",
    "/dashboard/category",
    "/dashboard/manage-product",
    "/dashboard/sub-cat",
    "/dashboard/users",
    "/dashboard/add-product",
    "/dashboard/blogs",
  ];

  if (hiddenPaths.includes(pathname)) {
    return null; // Return null to hide the Appbar
  }

  const isActiveLink = (href: any) => {
    return pathname === href;
  };

  return (
    <header className="absolute inset-x-0 top-0 z-10 w-full">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            <Link href={"/"} title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80"> Home </Link>

            <Link href={"/"} title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80"> Portfolio </Link>

            <Link href={"/dashboard"} title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80"> Dashboard </Link>

          </div>

          <div className="lg:flex lg:items-center lg:justify-end lg:space-x-6 sm:ml-auto">
            <User />

            <a href="#" title="" className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200 text-white bg-white/20 hover:bg-white/40 focus:bg-white/40 rounded-lg" role="button"> Get SouceCode </a>
          </div>

          <Link href={"https://github.com/Pranav1239/next_adminPanel"} target="_blank" className="inline-flex p-2 ml-1 text-white transition-all duration-200 rounded-md sm:ml-4 lg:hidden focus:bg-gray-800 hover:bg-gray-800">

            <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>

            <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Appbar;
{/* <header className=" bg-black text-white flex items-center justify-between">
  <div className="text-3xl">
    <Image src={logo} width={80} height={80} alt="Logo" />
  </div>
  <nav className="flex justify-center items-center gap-20">
    <Link href="/" className="relative">
      <div
        className={`text-white ${isActiveLink("/") ? "font-bold" : ""
          }`}
      >
        Home
      </div>
      {isActiveLink("/") && (
        <div className=""></div>
      )}
    </Link>
    <Link href="/socials" className="relative">
      <div
        className={`text-white ${isActiveLink("/socials") ? "font-bold" : ""
          }`}
      >
        Socials
      </div>
      {isActiveLink("/socials") && (
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      )}
    </Link>
  </nav>
  <div className="p-2">
 
  </div>
</header> */}