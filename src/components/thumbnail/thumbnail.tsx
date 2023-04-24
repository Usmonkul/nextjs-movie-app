import React from "react";
import { ThumbnailProps } from "./thumbnail.props";
import Image from "next/image";
import { image_base } from "@/helpers/constants";
const Thumbnail = ({ movie }: ThumbnailProps) => {
  return (
    <div className="relative h-[330px] min-w-[200px] cursor-pointer transition duration-200 ease-out md:h-[440px] md:min-w-[292px] hover:scale-105">
      <Image
        src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
        alt={movie.title}
        fill
        className="rounded-sm md:rounded-md object-cover"
      />
    </div>
  );
};

export default Thumbnail;
