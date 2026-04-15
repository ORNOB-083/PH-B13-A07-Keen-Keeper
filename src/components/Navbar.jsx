import React from "react";
import Image from "next/image";
import Link from "next/link";
import logoImg from "@/assets/logo.png";
import { HiOutlineHome, HiOutlineClock, HiOutlineChartBar } from "react-icons/hi2";

const Navbar = () => {
  const navItems = [
    { path: "/", text: "Home", icon: <HiOutlineHome /> },
    { path: "/timeline", text: "Timeline", icon: <HiOutlineClock /> },
    { path: "/stats", text: "Stats", icon: <HiOutlineChartBar /> },
  ];

  return (
    <nav className="w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <Link href="/" className="flex items-center">
          <Image
            src={logoImg}
            alt="KeenKeeper Logo"
            className="h-7 w-auto md:h-9"
            priority
          />
        </Link>

        <ul className="flex items-center gap-1 sm:gap-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-gray-50 hover:text-slate-900"
              >
                <span className="text-xl md:text-lg">{item.icon}</span>
                <span className="hidden sm:inline-block">
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;