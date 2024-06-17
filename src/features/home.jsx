import React, { useState, useEffect } from "react";
import Card from '../components/card'; 
import Navbar from "../components/navbar";
import { fetchPublishes } from '../services/services';


const Home = () => {
  const [cardData, setCardData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const res = await fetchPublishes();
        setCardData(res.data);
        console.log(res.data)
  
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar/>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center w-full sm:w-3/4 lg:w-1/2 mt-6">
          {cardData.map((card, index) => (
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

export default Home;
