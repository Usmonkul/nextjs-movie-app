import React, { useContext, useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { FaTimes } from "react-icons/fa";
import { useInfoStore } from "@/store";
import { Element } from "@/interfaces/app.interface";
import ReactPlayer from "react-player";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { BiPlus } from "react-icons/bi";
import { AuthContext } from "@/context/auth.context";
import { useRouter } from "next/router";
const Modal = () => {
  const base_url = process.env.NEXT_PUBLIC_API_DOMAIN as string;
  const api_key = process.env.NEXT_PUBLIC_API_KEY as string;

  const { modal, setModal, currentMovie } = useInfoStore();
  const [trailer, setTrailer] = useState<string>("");
  const [muted, setMuted] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const handleClose = () => {
    setModal(false);
  };
  const api = `${base_url}/${
    currentMovie?.media_type === "tv" ? "tv" : "movie"
  }/${currentMovie.id}/videos?api_key=${api_key}&language=en-US`;
  useEffect(() => {
    const fetchMovieData = async () => {
      const data = await fetch(api).then((res) => res.json());
      if (data?.results) {
        const index = data.results.findIndex(
          (el: Element) => el.type === "Trailer"
        );
        setTrailer(data?.results[index]?.key);
      }
    };

    fetchMovieData();
    // eslint-disable-next-line
  }, [currentMovie]);

  const addProductList = async () => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "list"), {
        userId: user?.uid,
        product: currentMovie,
      });
      setIsLoading(false);
      router.replace(router.asPath);
    } catch (e) {
      console.error("Error adding document:", e);
    }
  };
  return (
    <MuiModal
      open={modal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-y-scroll scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-50 h-9 w-9 border-none bg-[#181818]"
        >
          <FaTimes />
        </button>
        <div className="relative w-full h-full">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width={"100%"}
            height={"100%"}
            playing
            style={{ position: "absolute", top: 0, left: 0 }}
            muted={muted}
            controls
          />
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {currentMovie!.vote_average * 10}% Match
              </p>
              <p className="font-light">{currentMovie?.release_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
              <button
                onClick={addProductList}
                className="flex items-center bg-[#E10856]/80 py-[3px] px-3 rounded font-medium"
              >
                <BiPlus className="mr-1 w-5 h-5" /> Add to List
              </button>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{currentMovie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {currentMovie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {currentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
