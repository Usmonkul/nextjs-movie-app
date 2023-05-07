import { ITrendingMovie } from "@/interfaces/app.interface";
import { create } from "zustand";

interface InfoState {
  modal: boolean;
  movie: ITrendingMovie;
  setModal: (bool: boolean) => void;
  setMovie: (movie: ITrendingMovie) => void;
}

export const useInfoStore = create<InfoState>()((set) => ({
  modal: false,
  movie: {} as ITrendingMovie,
  setModal: (bool: boolean) => set((state) => ({ ...state, modal: bool })),
  setMovie: (movie: ITrendingMovie) =>
    set((state) => ({ ...state, movie: movie })),
}));
