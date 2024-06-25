import React, { useState } from 'react';
import { updatePublish } from '../services/services';

const UpdateModal = ({ id, ismodalOpen, initialTitle, initialContent, toggleEditModal }) => {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [image, setImage] = useState(null);
    const [imgChanged, setImgChanged] = useState(false);

    // Función para cerrar el modal
    const closeModal = () => {
        setTitle(initialTitle); // Restaurar título inicial al cerrar modal
        setContent(initialContent); // Restaurar contenido inicial al cerrar modal
        setImage(null); // Limpiar imagen seleccionada al cerrar modal
        setImgChanged(false); // Restaurar estado de imagen cambiada al cerrar modal
        toggleEditModal(); // Cerrar modal cambiando el estado en LittleCard
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setImgChanged(true);
    };

    const onEdit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('Title_p', title);
            formData.append('Content_p', content);
            if (imgChanged && image) formData.append('file', image);

            const res = await updatePublish(id, formData);
            console.log(res.data);
            window.location.reload();
        } catch (e) {
            console.error("Error updating publish:", e);
            throw e;
        }
    };

    return (
        <>
            {ismodalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg mx-4 sm:mx-auto">
                        <h2 className="text-xl font-bold mb-4">Editar Publicación</h2>
                        <form onSubmit={onEdit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Título</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={handleTitleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Contenido</label>
                                <textarea
                                    value={content}
                                    onChange={handleContentChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Imagen</label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal} // Usar función para cerrar el modal
                                    className="mr-4 px-4 py-2 bg-gray-300 rounded-md"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateModal;

