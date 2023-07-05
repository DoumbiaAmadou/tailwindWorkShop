"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen((prev) => !prev);
  return (
    <>
      {/* Burger Menu Icon  */}
      <div className="flex md:hidden  ">
        <button className="relative group" onClick={toggle}>
          <div
            className={clsx(
              "relative flex overflow-hidden items-center justify-center rounded-full w-[30px] h-[30px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8  ring-opacity-30 duration-200 shadow-md",
              open && "group-focus:ring-4"
            )}
          >
            <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
              <div
                className={clsx(
                  "bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ",
                  open && "group-focus:rotate-[42deg]"
                )}
              ></div>
              <div
                className={clsx(
                  "bg-white h-[2px] w-1/2 rounded transform transition-all duration-300",
                  open && "group-focus:-translate-x-10"
                )}
              ></div>
              <div
                className={clsx(
                  "bg-white h-[2px] w-7 transform transition-all duration-300 origin-left",
                  open && "group-focus:-rotate-[42deg]"
                )}
              ></div>
            </div>
          </div>
        </button>
      </div>
      <ul
        className={clsx(
          "absolute md:static top-[69px] dark:border-neutral-800 dark:bg-zinc-800/60  md:bg-transparent  md:flex md:top-5 font-mono w-full md:w-auto md:px-4  md:items-center md:space-x-5 transition  ease-out duration-300 ",
          !open && "hidden "
        )}
      >
        <li className="cursor-pointer flex justify-center hover:bg-blue-900 rounded px-10  py-3">
          <Link href={"/"} onClick={toggle}>
            Film
          </Link>
        </li>
        <li className="cursor-pointer flex justify-center hover:bg-blue-900 rounded px-10  py-3">
          <Link href={"/todolist"} onClick={toggle}>
            TodoList
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
