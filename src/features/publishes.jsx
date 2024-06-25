import React, { useState, useEffect } from "react";
import LittleCard from "../components/littleCard";
import Navbar from "../components/navbar";
import SearchBar from "../components/searchBar";
import { getPublishByIdUser } from '../services/services';
import MyButton from '../components/button';

const Publishes = () => {
  const [cardData, setCardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulando una demora de 2 segundos para la carga
        setTimeout(async () => {
          const res = await getPublishByIdUser();
          setCardData(res.data);
          setLoading(false); 
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Ensure loading is marked as false even on error
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const filteredCardData = cardData.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <MyButton />
        </div>
        {loading ? (
          <p className="text-center text-gray-600">Cargando...</p>
        ) : filteredCardData.length === 0 ? (
          <p className="text-center text-gray-600">Aún no hay publicaciones.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCardData.map((card, index) => (
              <LittleCard
                key={index}
                id={card.postId}
                title={card.title}
                content={card.content}
                imageUrl={card.imageUrl}
                date={card.publicationDate}
                userImg={card.userAvatar}
                userName={card.userName}
                width="max-w-2xl"
                showForm={true}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Publishes;


