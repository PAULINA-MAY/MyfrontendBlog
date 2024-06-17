import React, { useState, useEffect } from "react";
import Card from "../components/card"; 
import Navbar from "../components/navbar";
import SearchBar from "../components/searchBar"; 
import { getPublishByIdUser } from '../services/services';


import MyButton from '../components/button'

const Profile = () => {
  const [cardData, setCardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPublishByIdUser();
        console.log(res.data); 
        setCardData(res.data);
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
          <MyButton/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCardData.map((card, index) => (
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
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;

