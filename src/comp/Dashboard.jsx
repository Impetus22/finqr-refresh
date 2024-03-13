import React, { useRef, useState } from 'react'
import Section from '../components/Section'
import FlippableCard from "../components/card/flipp-card";
import AnimatedCard from '../components/AnimatedCard';
import "./Dashboard.css";


const Dashboard = () => {
  
  const [cards] = useState([
    <FlippableCard key={1} />,
    <FlippableCard key={2} />,
    <FlippableCard key={3} />,
    // Aggiungi altre card se necessario
  ]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === cards.length - 1 ? prevIndex : prevIndex + 1));
  };

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

  const containerRef = useRef(null);
  const touchStartXRef = useRef(null);

  const handleSwipe = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;
    if (deltaX > 50) {
      prevCard();
    } else if (deltaX < -50) {
      nextCard();
    }
  };

  return (
    <Section className="pt-[10rem] -mt-[8.25rem] -mb-[-3rem]" crosses>
      <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[0.875rem] md:mb-10 lg:mb-[1.25rem]">
        <h5 className="h5 mb-3">Welcome user, have a look at your QRs:</h5>
      </div>

      <div className="flex justify-center items-center mt-4 mb-3">
        {cards.map((_, index) => (
          <button
            key={index} 
            className={`mx-2 w-2 h-2 rounded-full ${index === currentCardIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            onClick={() => setCurrentCardIndex(index)}
          />
        ))}
      </div>

      <div className="flex justify-center items-center relative">
        <div className="absolute left-4 md:left-60 lg:left-96 top-1/2 transform -translate-y-1/2">
          <button onClick={prevCard} className={`  focus:outline-none ${currentCardIndex === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-200 cursor-pointer'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        </div>
        


        <div
        ref={containerRef}
        className="flex justify-center items-center relative"
        onTouchStart={(e) => {
          touchStartXRef.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          handleSwipe(e);
          touchStartXRef.current = null;
        }}
      >




        <div className="relative">
          {cards.map((card, index) => (
            <AnimatedCard key={index} index={index} currentIndex={currentCardIndex}>
            <div className={`${index === currentCardIndex ? 'block' : 'hidden'}`}>
              {card}
            </div>
          </AnimatedCard>
          ))}
        </div>
        </div>



        <div className="absolute right-1 md:right-60 lg:right-96 xl:right-120 top-1/2 transform -translate-y-1/2">
          <button onClick={nextCard} className={`  focus:outline-none ${currentCardIndex === cards.length - 1 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-200 cursor-pointer'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </Section>
  );
};

export default Dashboard
