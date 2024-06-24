import React, { useState } from 'react';
import { FaEllipsisV, FaTrash, FaEdit } from 'react-icons/fa'; 
import { Card } from "flowbite-react";

const LittleCard = ({ id, title, content, imageUrl, date, userImg, userName, onDelete, onEdit }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const formattedDate = new Date(date).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  // Function to truncate text if longer than maxCharacters and add ellipsis
  const truncateText = (text, maxCharacters) => {
    if (text.length > maxCharacters) {
      return `${text.substring(0, maxCharacters)}...`;
    } else {
      return text;
    }
  };

  // Truncate title and content
  const truncatedTitle = truncateText(title, 18);
  const truncatedContent = truncateText(content, 50);

  return (
    <Card className="max-w-sm transform transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img
          className="object-cover w-full h-full"
          alt="Meaningful alt text for an image that is not purely decorative"
          src={imageUrl}
        />
      </div>
      <div className="p-4">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white h-12 overflow-hidden">
          <span className="line-clamp-2">{truncatedTitle}</span>
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 h-16 overflow-hidden">
          <span className="line-clamp-3">{truncatedContent}</span>
        </p>
        <div className="flex justify-between items-center mt-4 relative">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formattedDate}
          </span>
          <div className="relative">
            <button 
              onClick={toggleMenu} 
              className="text-gray-500 hover:text-gray-700"
            >
              <FaEllipsisV />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <button 
                  onClick={() => onEdit(id)} 
                  className="flex items-center p-2 w-full text-left hover:bg-gray-100"
                >
                  <FaEdit className="mr-2 text-indigo-500" />
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(id)} 
                  className="flex items-center p-2 w-full text-left hover:bg-gray-100"
                >
                  <FaTrash className="mr-2 text-red-500" />
                  Borrar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LittleCard;






