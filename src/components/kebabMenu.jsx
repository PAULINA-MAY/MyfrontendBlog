import React from 'react';
import { FaEllipsisV, FaTrash, FaEdit } from 'react-icons/fa';
import { deletePublish } from '../services/services';

const KebabMenu = ({ id, toggleEditModal }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await deletePublish(id);
      console.log(res.data);
      window.location.reload();
    } catch (e) {
      console.log(e)
      throw e;
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    toggleEditModal(); 
  };

  return (
    <div className="ml-auto relative">
      <button
        onClick={toggleMenu}
        className="text-gray-500 hover:text-gray-700"
      >
        <FaEllipsisV />
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <button
            onClick={handleEdit} // Llamar a la función de edición
            className="flex items-center p-2 w-full text-left hover:bg-gray-100"
          >
            <FaEdit className="mr-2 text-indigo-500" />
            Editar
          </button>
          <button
            onClick={onDelete}
            className="flex items-center p-2 w-full text-left hover:bg-gray-100"
          >
            <FaTrash className="mr-2 text-red-500" />
            Borrar
          </button>
        </div>
      )}
    </div>
  );
};

export default KebabMenu;












