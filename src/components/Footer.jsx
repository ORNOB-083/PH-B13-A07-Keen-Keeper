import React from "react";
import Image from "next/image";
import Link from "next/link";

import instagramIcon from "@/assets/instagram.png";
import facebookIcon from "@/assets/facebook.png";
import twitterIcon from "@/assets/twitter.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { src: instagramIcon, alt: "Instagram", href: "#" },
    { src: facebookIcon, alt: "Facebook", href: "#" },
    { src: twitterIcon, alt: "X (Twitter)", href: "#" },
  ];

  return (
    <footer className="bg-[#1e3d37] text-white pt-16 pb-8 px-4">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-5xl font-bold tracking-tight mb-4">
            KeenKeeper
          </h2>
          <p className="max-w-2xl text-gray-300 text-sm md:text-base leading-relaxed mb-8">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Social Links</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <Link 
                  key={index} 
                  href={social.href} 
                  className="bg-white p-2 rounded-full transition-transform hover:scale-110 active:scale-95"
                >
                  <Image 
                    src={social.src} 
                    alt={social.alt} 
                    width={40} 
                    height={40} 
                    className="w-6 h-6 object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-400">
          <p>&copy; {currentYear} KeenKeeper. All rights reserved.</p>
          
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;