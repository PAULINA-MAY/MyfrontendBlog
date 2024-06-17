import React, { useState, useEffect } from "react";
import Card from "../components/card"; 
import Navbar from "../components/navbar";
import SearchBar from "../components/searchBar"; 
import { fetchPublishes } from '../services/services';
import { FaPlus } from 'react-icons/fa';


const Profile = () => {
  const [cardData, setCardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchPublishes();
        setCardData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
          <button className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 flex items-center ml-4">
            <FaPlus className="text-white" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCardData.map((card, index) => (
            <Card
              key={index}
              id={card.posId}
              title={card.title}
              content={card.content}
              imageUrl={card.imageUrl}
              initialComments={card.comments.map(comment => comment.commentContent)}
              date={card.publicationDate}
              userImg={card.userAvatar}
              userName={card.userName}
              width="w-full"
              showForm={false}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;


