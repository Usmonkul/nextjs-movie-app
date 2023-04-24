import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { BiBellMinus } from "react-icons/bi";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);
  return (
    <header className={`${scrolled && "bg-[#E10856] shadow-lg"}`}>
      <div className="flex items-center space-x-2 md:space-x-10 ">
        <Image
          src={"/Logo.svg"}
          alt="Logo"
          height={56}
          width={56}
          className="cursor-pointer object-contain"
        />
        <ul className="space-x-4 md:flex hidden">
          <li className="navLink">Home</li>
          <li className="navLink">Movies</li>
          <li className="navLink">Tv Series</li>
          <li className="navLink">Popular</li>
          <li className="navLink">New</li>
        </ul>
      </div>
      <div className="flex items-center space-x-8 text-sm font-light">
        <AiOutlineSearch className="h-6 w-6 cursor-pointer" />
        <p className="hidden lg:inline text-base">Kids</p>
        <BiBellMinus className="h-6 w-6 cursor-pointer" />
        <Link href={"/account"}>
          <AiOutlineUser className="h-6 w-6 cursor-pointer" />
        </Link>
      </div>
    </header>
  );
};

export default Header;