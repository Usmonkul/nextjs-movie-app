import Link from "next/link";
import Image from "next/image";
import React from "react";
import { BiErrorAlt } from "react-icons/bi";

const Cancel = () => {
  return (
    <>
      <div className="flex flex-start py-2 px-4">
        <Image
          src={"/Logo.svg"}
          alt="Logo"
          height={56}
          width={56}
          className="cursor-pointer object-contain"
        />
      </div>
      <div className="flex flex-col justify-center items-center h-[90vh]">
        <div className="flex space-x-4 items-center justify-center">
          <h1 className="text-2xl md:text-5xl">Canceled Subscription</h1>
          <BiErrorAlt className="h-14 w-14 text-red-500" />
        </div>
        <Link href={"/"}>
          <button className="mt-6 bg-[#E10856] py-4 px-5 rounded">
            Choose Plan
          </button>
        </Link>
      </div>
    </>
  );
};

export default Cancel;
