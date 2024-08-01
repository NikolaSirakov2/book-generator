import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  LogOut,
  CircleDollarSign,
  HomeIcon,
  BookPlus,
  LibraryBig,
} from "lucide-react";
import { usePathname } from "next/navigation";
import BreadcrumbComponent from "./Breadcrumb";
import useDecodedToken from "./useDecodedToken";

function NavBar() {
  const path = usePathname();

  const isActive = (href: string) => path === href;
  const { token, decodedJwt: decodedToken } = useDecodedToken();

  return (
    <div className="flex flex-col justify-between p-0 lg:ml-40">
      <div className="lg:hidden flex justify-between items-center bg-gradient-to-br from-blue-200 via-blue-500 to-blue-200">
        <Image src="/InkastleLogo.png" alt="logo" width={70} height={30} />
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="mr-2 my-2">
            Menu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex justify-center items-center w-screen h-screen text-white bg-gray-400">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <span
                  className={`flex items-center ${
                    isActive("/dashboard") ? "text-black" : ""
                  }`}
                >
                  <HomeIcon className="mr-2 h-8 w-8" />
                  <span className="text-2xl">Home</span>
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/mybooks">
                <span
                  className={`flex items-center ${
                    isActive("/dashboard/mybooks") ? "text-black" : ""
                  }`}
                >
                  <LibraryBig className="mr-2 h-8 w-8" />
                  <span className="text-2xl">My Books</span>
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/createbook">
                <span
                  className={`flex items-center ${
                    isActive("/dashboard/createbook") ? "text-black" : ""
                  }`}
                >
                  <BookPlus className="mr-2 h-8 w-8" />
                  <span className="text-2xl">Create Book</span>
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/subscriptions">
                <span
                  className={`flex items-center ${
                    isActive("/dashboard/subscriptions") ? "text-black" : ""
                  }`}
                >
                  <CircleDollarSign className="mr-2 h-8 w-8" />
                  <span className="text-2xl">Subscriptions</span>
                </span>
              </Link>
            </DropdownMenuItem>
    
            <DropdownMenuItem asChild>
              <Link href="/login">
                <span
                  className={`flex items-center ${
                    isActive("/user/login") ? "text-black" : ""
                  }`}
                >
                  <LogOut className="mr-2 h-8 w-8" />
                  <span className="text-2xl">Log out</span>
                </span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
      <BreadcrumbComponent />
    </div>
  );
}

export default NavBar;
