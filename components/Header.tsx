"use client";

import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button className="flex rounded-full bg-black items-center justify-center hover:opacity-75 transition">
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button className="flex rounded-full bg-black items-center justify-center hover:opacity-75 transition">
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <>
            <div>
              <Button className="bg-transparent text-neutral-300 font-medium">
                Sign Up
              </Button>
            </div>
            <div>
              <Button className="bg-white px-6 py-2">Log In</Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
