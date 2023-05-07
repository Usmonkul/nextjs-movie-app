import { ITrendingMovie } from "@/interfaces/app.interface";
import { create } from "zustand";

interface InfoState {
  modal: boolean;
  currentMovie: ITrendingMovie;
  setModal: (bool: boolean) => void;
  setCurrentMovie: (movie: ITrendingMovie) => void;
}

export const useInfoStore = create<InfoState>()((set) => ({
  modal: false,
  currentMovie: {} as ITrendingMovie,
  setModal: (bool: boolean) => set((state) => ({ ...state, modal: bool })),
  setCurrentMovie: (movie: ITrendingMovie) =>
    set((state) => ({ ...state, currentMovie: movie })),
}));
