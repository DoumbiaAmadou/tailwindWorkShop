"use client";
import React from "react";

import { BASE_URL } from "./../services/filmService";
import { MovieType } from "../../type";

type Props = {
  films: MovieType[];
};

const Film = ({ films = [] }: Props): React.JSX.Element => {
  return (
    <div className="w-full">
      <div className="w-full text-center">films list here </div>
      <div className=" w-full grid text-center  lg:mt-2 lg:grid-cols-3 sm:grid-cols-2 lg:text-left gap-4 ">
        {films.map((film) => (
          <div className="h-[310px] group rounded-lg border border-transparent px-5 sm:py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 space-y-1 relative">
            <img
              className="h-[270px] mx-auto justify-center rounded shadow-2xl "
              src={BASE_URL + film.poster_path}
              alt="mage"
            />
            <div className="flex justify-center items-center">
              <span className="text-sm">{film.original_title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Film;
