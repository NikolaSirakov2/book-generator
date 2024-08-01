"use client";
import React from "react";
import Image from "next/image";
import {
  BookPlus,
  CircleDollarSign,
  HomeIcon,
  LibraryBig,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useDecodedToken from "./useDecodedToken";

function SideBar() {
  const path = usePathname();

  const isActive = (href: string) => {
    return path === href;
  };

  const { token, decodedJwt: decodedToken } = useDecodedToken();

  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-blue-200 via-blue-500 to-blue-200 shadow-xl rounded-xl flex flex-col justify-start items-center">
      <div className="flex flex-col w-full">
        <Image
          src="/InkastleLogo.png"
          alt="logo"
          width={100}
          height={100}
          className="m-4 mb-10 self-center"
        />
        <div className="flex flex-col items-center gap-6">
          <Link href="/dashboard">
            <div
              className={`group flex flex-col items-center cursor-pointer ${
                isActive("/dashboard") ? "text-green-200" : ""
              }`}
            >
              <HomeIcon size={24} />
              <span className="opacity-0 group-hover:opacity-100">Home</span>
            </div>
          </Link>
          <Link href="/dashboard/mybooks">
            <div
              className={`group flex flex-col items-center cursor-pointer ${
                isActive("/dashboard/mybooks") ? "text-green-200" : ""
              }`}
            >
              <LibraryBig size={24} />
              <span className="opacity-0 group-hover:opacity-100">
                My Books
              </span>
            </div>
          </Link>
          <Link href="/dashboard/createbook">
            <div
              className={`group flex flex-col items-center cursor-pointer ${
                isActive("/dashboard/createbook") ? "text-green-200" : ""
              }`}
            >
              <BookPlus size={24} />
              <span className="opacity-0 group-hover:opacity-100">
                Create Book
              </span>
            </div>
          </Link>
          <Link href="/dashboard/subscriptions">
            <div
              className={`group flex flex-col items-center cursor-pointer ${
                isActive("/dashboard/subscriptions") ? "text-green-200" : ""
              }`}
            >
              <CircleDollarSign size={24} />
              <span className="opacity-0 group-hover:opacity-100">
                Subscriptions
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex-grow"></div>
     
          <Settings size={24} />
          <span className="opacity-0 group-hover:opacity-100">Account</span>
        
    </div>
  );
}

export default SideBar;
