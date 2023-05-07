import React from "react";
import MuiModal from "@mui/material/Modal";
import { FaTimes } from "react-icons/fa";
import { useInfoStore } from "@/store";
const Modal = () => {
  const { modal, setModal, currentMovie } = useInfoStore();
  const handleClose = () => {
    setModal(false);
  };
  return (
    <MuiModal open={modal} onClose={handleClose}>
      <button
        onClick={handleClose}
        className="modalButton absolute right-5 top-5 !z-50 h-9 w-9 border-none bg-[#181818]"
      >
        <FaTimes />
      </button>
    </MuiModal>
  );
};

export default Modal;
