"use client";
import React from "react";

import { MovieType } from "../../type";
import { BASE_URL } from "./../services/filmService";

type Props = {
  films: MovieType[];
};

const Film = ({ films = [] }: Props): React.JSX.Element => {
  return (
    <div className="w-full">
      <div className="w-full text-center my-10 font-semibold text-xl">
        films list
      </div>
      <div className=" w-full min-w-[240px] grid text-center  lg:mt-2 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:text-left gap-4 ">
        {films.map((film) => (
          <div
            className="h-[320px] flex flex-col group rounded-lg border border-transparent md:px-5 sm:py-4 transition-colors bg-slate-500 bg-opacity-5 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 space-y-1 relative"
            key={film.id}
          >
            <div className=" w-full px-2 h-[80%] ">
              <img
                className="h-full mx-auto justify-center rounded shadow-2xl "
                src={BASE_URL + film.poster_path}
                alt="image"
              />
            </div>
            <div className="h-[20%] w-full p-1 flex justify-center items-center  rounded ">
              <p className="text-sm text-ellipsis line-clamp-2 w-[90%]">
                {film.original_title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Film;
