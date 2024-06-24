import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import { addNewPublish } from '../services/services';

const Modal = ({ isOpen, onClose }) => {
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalImage, setModalImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setModalImage(file);
      console.log("Image file selected:", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', modalTitle);
    formData.append('content', modalContent);
    formData.append('file', modalImage);

  
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const res = await addNewPublish(formData);
      console.log("Datos guardados en Modal:", res);
      onClose();
      setModalTitle('');
      setModalContent('');
      setModalImage(null);
      setImagePreview(null);
      window.location.reload();
    } catch (error) {
      console.error("Error posting new publish:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full max-w-lg mx-auto my-6 mt-16">
            {/* Contenido del modal */}
            <div className="bg-white rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
              {/* Cabecera del modal */}
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-xl font-semibold">Crear nuevo elemento</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-gray-500 opacity-75 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="text-gray-500">×</span>
                </button>
              </div>
              {/* Contenido del modal */}
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1">Título:</label>
                    <input
                      type="text"
                      value={modalTitle}
                      onChange={(e) => setModalTitle(e.target.value)}
                      className="w-full border-gray-300 border p-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Texto largo:</label>
                    <textarea
                      value={modalContent}
                      onChange={(e) => setModalContent(e.target.value)}
                      className="w-full border-gray-300 border p-2 rounded"
                      rows="4"
                      required
                    />
                  </div>
                  <div className="flex w-full items-center justify-center">
                    <Label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center w-full h-full pt-5 pb-6">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover mb-4" />
                        ) : (
                          <>
                            <svg
                              className="mb-4 h-8 w-8 text-gray-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </>
                        )}
                      </div>
                      <FileInput id="dropzone-file" className="hidden" onChange={handleImageUpload} />
                    </Label>
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                  >
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;






