import React, { useState } from "react";

const Modal = ({ isOpen, onClose }) => {
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalImage, setModalImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setModalImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', modalTitle);
    formData.append('content', modalContent);
    formData.append('image', modalImage);

    // Aquí manejas el onSave internamente en el Modal
    console.log("Datos guardados en Modal:", formData);
    // Aquí podrías enviar los datos a una API, actualizar el estado local, etc.

    onClose(); // Cierra el modal después de guardar
    // Limpiar los campos después de guardar si es necesario
    setModalTitle('');
    setModalContent('');
    setModalImage(null);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-lg mx-auto my-6">
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
                  <div>
                    <label className="block mb-1">Subir Imagen:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full"
                    />
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



