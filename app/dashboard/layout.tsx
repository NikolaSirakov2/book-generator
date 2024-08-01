'use client';
import React, { ReactNode } from "react";
import NavBar from "./_components/Navbar";
import SideBar from "./_components/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
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
