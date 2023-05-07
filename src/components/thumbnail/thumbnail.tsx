import React from "react";
import { ThumbnailProps } from "./thumbnail.props";
import Image from "next/image";
import { image_base } from "@/helpers/constants";
import ReactStars from "react-stars";
import { useInfoStore } from "@/store";
const Thumbnail = ({ movie, isBig = false }: ThumbnailProps) => {
  const { setModal, setCurrentMovie } = useInfoStore();
  const handleCurrentMovie = () => {
    setModal(true);
    setCurrentMovie(movie);
  };
  return (
    <div
      onClick={handleCurrentMovie}
      className={`relative ${
        isBig
          ? "h-[450px] md:h-[550px] min-w-[350px] md:min-w-[400px]"
          : "h-[330px] min-w-[200px] md:h-[440px] md:min-w-[292px]"
      } cursor-pointer transition duration-200 ease-out  hover:scale-105`}
    >
      <Image
        src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
        alt={movie.title}
        fill
        className="rounded-sm md:rounded-md object-cover"
      />
      <div className="absolute inset-0 w-full h-full bg-black/40" />
      <div className="absolute bottom-5 left-5 right-2">
        <div className="flex flex-col">
          <ReactStars
            edit={false}
            count={10}
            value={movie.vote_average}
            color2={"#fff"}
          />
          <h1 className="text-xl font-bold md:text-2xl">
            {movie?.title ||
              movie?.name ||
              movie?.original_title ||
              movie?.original_name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
