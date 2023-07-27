"use client";

import { cleanLocalStorage, getAuth } from "@/lib/storage";
import { logout } from "@/services/userServices";
import { selectAuthState, setAuthState } from "@/store/authSlice";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();
    if (!authState.status && auth) {
      dispatch(setAuthState(auth));
    }
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);
  const disconnexion = async () => {
    const data = await logout("" + authState.user?.id);
    if (data.status !== 200) {
      console.log("LOG: LOGOUT error");
      return;
    }
    dispatch(
      setAuthState({
        status: false,
        user: undefined,
      })
    );
    cleanLocalStorage();
    closeMenu();
  };

  return (
    <div className="z-20 w-full fixed flex justify-around items-center font-mono text-sm border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-5  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit ">
      <p className="  ">
        Bonjour {authState.status ? authState.user?.name : "à tous!"}
      </p>
      {/* Burger Menu Icon  */}
      <div className="flex md:hidden  ">
        <button className="relative group" onClick={toggle}>
          <div
            className={clsx(
              "relative flex overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all bg-slate-700 ring-0 ring-gray-700 dark:ring-blue-300 hover:ring-8  ring-opacity-30 duration-200 shadow-md ml-3",
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
          "absolute dark:bg-blue-300 bg-slate-300  md:static top-[69px] dark:border-neutral-800 dark:bg-zinc-800/60  md:bg-transparent  md:flex md:top-5 font-mono w-full md:w-auto md:px-4  md:items-center md:space-x-5 transition  ease-out duration-300 ",
          !open && "hidden "
        )}
      >
        <Link href={"/"} onClick={closeMenu}>
          <li className="cursor-pointer flex justify-center  hover:bg-slate-400 dark:hover:bg-blue-400 rounded px-10  py-3">
            Film
          </li>
        </Link>
        <Link href={"/todolist"} onClick={closeMenu}>
          <li className="cursor-pointer flex justify-center hover:bg-slate-400 dark:hover:bg-blue-400 rounded px-10  py-3">
            TodoList
          </li>
        </Link>
        {open && !authState.status && (
          <Link className=" md:hidden" href={"/login"} onClick={closeMenu}>
            <li className="cursor-pointer flex justify-center hover:bg-slate-400 dark:hover:bg-blue-400 rounded px-10  py-3">
              Connexion
            </li>
          </Link>
        )}
        {open && !authState.status && (
          <Link className=" md:hidden" href="#" onClick={closeMenu}>
            <li className="cursor-pointer flex justify-center hover:bg-slate-400 dark:hover:bg-blue-400 rounded px-10  py-3">
              s'inscrire
            </li>
          </Link>
        )}
        {open && authState.status && (
          <Link className=" md:hidden" href={"#"} onClick={disconnexion}>
            <li className="cursor-pointer flex justify-center hover:bg-slate-400 dark:hover:bg-blue-400 rounded px-10  py-3">
              se deconnecter
            </li>
          </Link>
        )}
      </ul>

      <div className="hidden md:block">
        {!authState.status && (
          <span className=" text-blue-500 hover:text-indigo-600  dark:hover:text-slate-100 underline">
            <Link href={"/login"} onClick={closeMenu} className="">
              connexion
            </Link>
          </span>
        )}{" "}
        {!authState.status && (
          <span className=" text-blue-500 hover:text-indigo-600  dark:hover:text-slate-100 underline">
            <Link href={"/create"} onClick={closeMenu} className="">
              s'inscrire
            </Link>
          </span>
        )}{" "}
        {authState.status && (
          <span className=" text-blue-500 hover:text-indigo-600  dark:hover:text-slate-100 underline	">
            <Link href={"#"} onClick={disconnexion}>
              se deconnecter
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
