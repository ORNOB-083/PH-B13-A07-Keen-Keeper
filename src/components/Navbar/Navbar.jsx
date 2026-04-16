import React from "react";
import Image from "next/image";
import Link from "next/link";
import logoImg from "@/assets/logo.png";
import { HiOutlineHome, HiOutlineClock, HiOutlineChartBar } from "react-icons/hi2";
import MyLink from "./MyLink";

const Navbar = () => {
  const navItems = [
    { path: "/", text: "Home", icon: <HiOutlineHome className="text-xl" /> },
    { path: "/timeline", text: "Timeline", icon: <HiOutlineClock className="text-xl" /> },
    { path: "/stats", text: "Stats", icon: <HiOutlineChartBar className="text-xl" /> },
  ];

  return (
    <nav className="w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link href="/" className="flex items-center">
          <Image
            src={logoImg}
            alt="KeenKeeper Logo"
            className="h-8 w-auto"
            priority
          />
        </Link>

        <ul className="flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <MyLink href={item.path}>
                {item.icon}
                <span className="hidden sm:inline-block">{item.text}</span>
              </MyLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;