import Link from "next/link";
import Image from "next/image";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

const Success = () => {
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
          <h1 className="text-2xl md:text-5xl">Subscription Complated</h1>
          <AiFillCheckCircle className="h-14 w-14 text-green-500" />
        </div>
        <Link href={"/"}>
          <button className="mt-7 bg-green-500 py-4 px-6 rounded">
            Dashboard
          </button>
        </Link>
      </div>
    </>
  );
};

export default Success;
