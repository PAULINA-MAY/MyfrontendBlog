import React, { useState } from "react";
import { FaPlus } from 'react-icons/fa';
import Modal from "../components/modal";

const MyButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };



  return (
    <>
      <button
        className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 flex items-center ml-4"
        onClick={openModal}
      >
        <FaPlus className="text-white" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
    
      />
    </>
  );
};

export default MyButton;
