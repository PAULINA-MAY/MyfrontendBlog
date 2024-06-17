import React, { useState } from 'react';
import { addNewComment } from '../services/services';

const Card = ({ id, title, content, imageUrl, initialComments, date, userImg, userName, width, height, showForm }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(initialComments || []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim()) {
      try {
        const res = await addNewComment(comment, id);
        console.log(res.data);

    
        setComments([...comments, comment]);
        setComment(''); 
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
  };

  return (
    <div className={`w-full ${width} bg-white shadow-md rounded-lg overflow-hidden mb-4`}>
      <div className="flex items-center p-4">
        <img className="w-10 h-10 rounded-full mr-4" src={userImg} alt="Avatar" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{userName}</h2>
          <p className="text-sm text-gray-600">{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
      <img className={`w-full ${height} object-cover`} src={imageUrl} alt="Card image" />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{content}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Comentarios</h3>
          <div className="max-h-32 overflow-y-auto mt-2 bg-gray-100 p-2 rounded-md">
            {comments.length === 0 ? (
              <p className="text-gray-600">No hay comentarios todavía. Sé el primero en comentar.</p>
            ) : (
              comments.map((comment, index) => (
                <p key={index} className="text-gray-800">{comment}</p>
              ))
            )}
          </div>
        </div>
        {showForm && (
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Escribe un comentario..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
            >
              Publicar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Card;

