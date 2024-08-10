'use client';
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "./_components/Navbar";
import SideBar from "./_components/Sidebar";
import { isTokenValid } from './_components/TokenValidation';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isTokenValid()) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="">
      <div className="">
        <NavBar />
      </div>
      <div className="flex justify-between gap-6 m-2">
        <div className="hidden lg:flex fixed ml-4 w-[5vw]">
          <SideBar />
        </div>
        <div className="w-[90vw] m-4 lg:mt-0 lg:ml-40 ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;