"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MyLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
        ${isActive 
          ? " bg-green-950 text-white shadow-sm"
          : "text-slate-500 hover:bg-gray-100 hover:text-slate-900"
        }`}
    >
      {children}
    </Link>
  );
};

export default MyLink;