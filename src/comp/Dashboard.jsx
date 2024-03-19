import React, { useEffect, useRef, useState } from 'react'
import Section from '../components/Section'
import FlippableCard from "../components/card/flipp-card";
import AnimatedCard from '../components/AnimatedCard';
import "./Dashboard.css";
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { BASE_PATH } from '../constants';
import { useAuth } from '../AuthProvider';



const Dashboard = () => {
  const { tokens } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [qrList, setQrList] = useState([]);
  const [showArrows, setShowArrows] = useState(true);

  const fetchUserQr = async () => {
    try {
      const response = await fetch(BASE_PATH + '/api/v1/user/qrs', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`, // Assicurati di includere l'access token nell'intestazione
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      console.log('Lista di oggetti dell\'utente:', data);
      if(response.status===200){
        setQrList(data.qrs);       //setto lo state dei qr
        console.log(data.qrs);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Errore durante il recupero della lista di oggetti:', error);
    }
  };

  useEffect(() => {
      //chiamata al backend per recuperare QR
        fetchUserQr(); 
  }, []);


  const flippableCards = qrList.map((qr, index) => (
    <FlippableCard
        key={index}
        id={qr.id}
        uuid={qr.uuid}//{qr.uuid}
        text="text"       //{qr.text}
        available={true}
        rewardType={qr.rewardModality}
        rewardAmount={qr.rewardAmount}
        objectAssociated={qr.objectAssociated}
        description={qr.description}
        contact={qr.contact}
        setShowArrows={setShowArrows} // Passa la funzione setShowArrows come prop
        />
));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === flippableCards.length - 1 ? prevIndex : prevIndex + 1));
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

    <Section className="pt-[10rem] -mt-[5.25rem] -mb-[0rem]" crosses     crossesOffset="lg:translate-y-[5.25rem]"
>
      {isLoading ? (
      // Mostra il codice per la pagina di caricamento se isLoading è true
      <div className="loading-page">
        <Spinner animation="border" variant="primary" />
        <p>Caricamento...</p>
      </div>
    ) : (
      <>
        {tokens && (
          // Mostra il contenuto della sezione se lo stato è confermato
          <>
            <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[0.875rem] md:mb-10 lg:mb-[1.25rem]">
            {showArrows && (
                        <h5 className="h5 mb-3">Welcome {tokens.name}, have a look at your QRs:</h5>
            )}
            </div>

            {qrList.length === 0 ? (
                <div className="text-center mb-20">
                  <p className="mb-2">Oh no, no QRs available.</p>
                  <Link to="/purchase" className="text-blue-500 hover:underline">
                    Get yours now
                  </Link>
                </div>
              ) : ( 
                <>
            <div className="flex justify-center items-center mt-4 mb-3">
        {flippableCards.map((_, index) => (
          <button
            key={index} 
            className={`mx-2 w-2 h-2 rounded-full ${index === currentCardIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            onClick={() => setCurrentCardIndex(index)}
          />
        ))}
      </div>

      <div className="flex justify-center items-center relative">
        <div className="absolute left-4 md:left-60 lg:left-96 top-1/2 transform -translate-y-1/2">
        {showArrows && (
          <button onClick={prevCard} className={`  focus:outline-none ${currentCardIndex === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-200 cursor-pointer'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          )}
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
          {flippableCards.map((card, index) => (
            <AnimatedCard key={index} index={index} currentIndex={currentCardIndex}>
            <div className={`${index === currentCardIndex ? 'block' : 'hidden'}`}>
              {card}
            </div>
          </AnimatedCard>
          ))}
        </div>
        </div>



        <div className="absolute right-1 md:right-60 lg:right-96  top-1/2 transform -translate-y-1/2">
        {showArrows && (
          <button onClick={nextCard} className={`  focus:outline-none ${currentCardIndex === flippableCards.length - 1 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-200 cursor-pointer'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        )}

        </div>
      </div>
          </>
        )}
      </>
    ) }
    </>
            )}

    </Section>
  );
};

export default Dashboard
