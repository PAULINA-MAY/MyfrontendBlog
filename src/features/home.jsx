import React, { useState, useEffect } from "react";
import Card from '../components/card'; 
import Navbar from "../components/navbar";
import { MyFooter } from "../components/footer";
import { fetchPublishes } from '../services/services';

const Home = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const res = await fetchPublishes();
          setCardData(res.data);
          setLoading(false); 
        }, 2000)
  
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Asegurar que loading se marque como false incluso en caso de error
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white-200 flex items-center justify-center">
        <div className="flex flex-col items-center w-full sm:w-3/4 lg:w-1/2 mt-6">
          {loading ? (
            <p className="text-center text-gray-600">Cargando...</p>
          ) : cardData.length === 0 ? (
            <p className="text-center text-gray-600">Aún no hay publicaciones.</p>
          ) : (
            cardData.map((card, index) => (
              <Card
                key={index}
                id={card.postId}
                title={card.title}
                content={card.content}
                imageUrl={card.imageUrl}
                initialComments={card.comments.map(comment => comment.commentContent)}
                date={card.publicationDate}
                userImg={card.userAvatar}
                userName={card.userName}
                width="max-w-2xl"
                showForm={true}
              />
            ))
          )}
        </div>
      </div>
      <MyFooter />
    </>
  );
};

export default Home;

