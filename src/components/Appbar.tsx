"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import User from "./user/User";

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
    <header className="bg-slate-900 flex justify-end p-5">
      <User />
    </header>
  );
};

export default Appbar;