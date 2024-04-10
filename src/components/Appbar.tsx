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
  ];

  if (hiddenPaths.includes(pathname)) {
    return null; // Return null to hide the Appbar
  }

  const isActiveLink = (href: any) => {
    return pathname === href;
  };

  return (
    <header className="bg-white text-black flex items-center justify-between">
      <div className="text-3xl">
        <Image src={logo} width={80} height={80} alt="Logo" />
      </div>
      <nav className="flex justify-center items-center gap-20">
        <Link href="/" className="relative">
          <div
            className={`text-black ${isActiveLink("/") ? "font-bold" : ""
              }`}
          >
            Home
          </div>
          {isActiveLink("/") && (
            <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          )}
        </Link>
        <Link href="/socials" className="relative">
          <div
            className={`text-black ${isActiveLink("/socials") ? "font-bold" : ""
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
        <User />
      </div>
    </header>
  );
};

export default Appbar;