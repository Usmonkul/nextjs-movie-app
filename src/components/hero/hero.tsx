import { useEffect, useState } from "react";
import { HeroProps } from "./hero.props";
import { ITrendingMovie } from "@/interfaces/app.interface";
import { image_base } from "@/helpers/constants";
import ReactStars from "react-stars";
import Image from "next/image";
import { useInfoStore } from "@/store";
const Hero = ({ trending }: HeroProps): JSX.Element => {
  const { setModal, setCurrentMovie } = useInfoStore();
  const [movie, setMovie] = useState<ITrendingMovie>({} as ITrendingMovie);

  const handleCurrentMovie = () => {
    setModal(true);
    setCurrentMovie(movie);
  };
  useEffect(() => {
    // const randomMovie = trending[Math.floor(Math.random() * trending.length)];
    const randomMovie = trending[16];
    setMovie(randomMovie);
  }, [trending]);
  return (
    <div className="flex flex-col space-y-2 py-28 md:space-y-4 lg:h-[65vh] lg:pb-12  lg:justify-center">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        <Image
          src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie.title}
          fill
          className=" object-cover"
        />
      </div>
      <div className="py-[4px] px-[8px] text-center rounded-tr-[8px] rounded-bl-[8px] bg-[#1d1d1d]/50 w-[111px]">
        {movie.media_type}
      </div>

      <div className="flex items-center space-x-4">
        <ReactStars
          edit={false}
          count={10}
          value={movie.vote_average}
          color2={"#fff"}
        />
        <p>{movie.vote_count}</p>
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">
        {movie?.title ||
          movie?.name ||
          movie?.original_title ||
          movie?.original_name}
      </h1>
      <p className="max-w-xs md:max-w-lg lg:max-w-2xl text-sm md:text-lg lg:text-xl text-shadow-md">
        {movie?.overview?.slice(0, 200)}...
      </p>
      <div
        onClick={handleCurrentMovie}
        className="p-[2px] rounded-full w-[200px] h-[56px] bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-50 "
      >
        <button className="p-3 bg-black/70 font-bold w-full h-full rounded-full hover:bg-slate-900 transition-all duration-200">
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
