import React, { useState, useEffect } from 'react';
import { addNewComment } from '../services/services';

const Card = ({ id, title, content, imageUrl, initialComments, date, userImg, userName, width, height, showForm }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(initialComments || []);

  // Este efecto se ejecuta cada vez que initialComments cambia
  useEffect(() => {
    setComments(initialComments || []);
  }, [initialComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim()) {
      try {
        const res = await addNewComment(comment, id);
        console.log(res.data);

        if (res.data && res.data.Id_c) {
          const newComment = {
            commentId: res.data.Id_c,
            commenterAvatar: res.data.user.ImgProfile_user,
            commenterName: `${res.data.user.FirstNames_user} ${res.data.user.LastNames_user}`,
            commentContent: res.data.Content_c,
            commentDate: res.data.DateCreated_c
          };
          setComments([...comments, newComment]);
        } else {
          console.error('Invalid response data:', res.data);
        }

        setComment('');
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
  };

  const formattedDate = new Date(date).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  return (
    <div className={`w-full ${width} bg-white shadow-lg rounded-lg overflow-hidden mb-4 hover:shadow-xl transition duration-300`}>
      {/* Usuario y fecha */}
      <div className="flex items-center p-4">
        <img className="w-12 h-12 rounded-full mr-4" src={userImg} alt="Avatar" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{userName}</h2>
          <p className="text-sm text-gray-600">{formattedDate}</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>

      {/* Imagen */}
      <img className={`w-full ${height} object-cover`} src={imageUrl} alt="Card image" />

      {/* Comentarios */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">Comentarios</h3>
        <div className="max-h-32 overflow-y-auto mt-2 bg-gray-100 p-2 rounded-md">
          {comments.length === 0 ? (
            <p className="text-gray-600">No hay comentarios todavía. Sé el primero en comentar.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.commentId} className="flex items-start mb-4">
                <img className="w-10 h-10 rounded-full mr-4" src={comment.commenterAvatar} alt="Commenter Avatar" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{comment.commenterName}</p>
                  <p className="text-sm text-gray-600">{comment.commentContent}</p>
                  <p className="text-xs text-gray-500">{new Date(comment.commentDate).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                  })}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Formulario de comentario */}
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
              className="mt-2 w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition duration-300"
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
