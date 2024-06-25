import React, { useState } from 'react';
import { Card } from "flowbite-react";
import KebabMenu from '../components/kebabMenu';
import UpdateModal from '../components/modalUpdate'; 

const LittleCard = ({ id, title, content, imageUrl, date, userImg, userName }) => {
  const formattedDate = new Date(date).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  const truncateText = (text, maxCharacters) => {
    if (text.length > maxCharacters) {
      return `${text.substring(0, maxCharacters)}...`;
    } else {
      return text;
    }
  };

  const truncatedTitle = truncateText(title, 18);
  const truncatedContent = truncateText(content, 50);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <>
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
          <div className="flex items-center mt-4">
            <img 
              className="w-10 h-10 rounded-full mr-4" 
              src={userImg} 
              alt={`${userName} avatar`} 
            />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{userName}</p>
              <p className="text-gray-500">{formattedDate}</p>
            </div>
            {/* Pasar props necesarios a KebabMenu */}
            <KebabMenu 
              id={id}
              title={title}
              content={content}
              toggleEditModal={toggleEditModal}
            />
          </div>
        </div>
      </Card>
      {/* Renderizar UpdateModal y pasar prop toggleEditModal */}
      <UpdateModal
        ismodalOpen={isEditModalOpen}
        initialTitle={title}
        initialContent={content}
        id={id}
        toggleEditModal={toggleEditModal}
      />
    </>
  );
};

export default LittleCard;






