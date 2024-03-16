import React, { useEffect, useRef, useState } from 'react'
import Section from '../components/Section'
import FlippableCard from "../components/card/flipp-card";
import AnimatedCard from '../components/AnimatedCard';
import "./Dashboard.css";
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { BASE_PATH } from '../constants';
import toast from 'react-hot-toast';


const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchDataResult, setFetchDataResult] = useState(null); // Nuova variabile di stato
  const [qrList, setQrList] = useState([]);

  const [state, setState] = useState(() => {
    // Recupera i token dai cookie
    const cookies = document.cookie.split('; ');
    const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken'));
    const refreshTokenCookie = cookies.find(cookie => cookie.startsWith('refreshToken'));
    
    // Se sono presenti token nei cookie, restituisci gli stati con i valori dei token
    if (accessTokenCookie && refreshTokenCookie) {
      const accessToken = accessTokenCookie.split('=')[1];
      const refreshToken = refreshTokenCookie.split('=')[1];
      return {
        confirmed: true,
        token: accessToken,
        refreshToken: refreshToken,
        cookies: true,
        loggedIn: true
      };}else{
        return {
          confirmed: false,
          token: '',
          refreshToken: '',
          cookies: false,
          loggedIn: false
        };
      }
    })
  


  async function fetchData(confToken) {
    try {
      const response = await fetch(BASE_PATH + `/api/v1/auth/register/confirm?confirmationToken=${confToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      return setFetchDataResult(data);
    } catch (error) {
      setIsLoading(false);
      //gestire errore
    }
  }

  const fetchUserQr = async () => {
    try {
      const response = await fetch(BASE_PATH + '/api/v1/user/qrs', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state.token}`, // Assicurati di includere l'access token nell'intestazione
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
      console.error('Errore durante il recupero della lista di oggetti:', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const confToken = urlParams.get('confirmationToken');
    if (confToken) {
      fetchData(confToken);
/*       urlParams.delete('confirmationToken');
      // Aggiorna l'URL senza il parametro 'confirmationToken'
      window.history.replaceState({}, document.title, `${window.location.pathname}${urlParams.toString()}`); */
    }else{
      //chiamata al backend per recuperare QR
      if(state.confirmed && state.cookies){
        
        fetchUserQr(); 

      }
      else{
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (fetchDataResult && fetchDataResult.esito.descrizione === "OK - success") { //todo controllare
      setState({
        confirmed: true, // Nuovo valore di confirmed
        token: fetchDataResult.token, // Nuovo valore di token1
        refreshToken: fetchDataResult.refreshToken, 
        loggedIn: false 
      });
      //return setConfirmed(true);

    } else if (fetchDataResult && fetchDataResult.esito.codice !== 200) {
      setIsLoading(false);
    }
  }, [fetchDataResult]);


  useEffect(() => {
    if (state.confirmed && !state.loggedIn) {
      //todo settare cookie con tempo giusto ecc..
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      document.cookie = `accessToken=${state.token}; path=/; expires=${expireDate.toUTCString()}`;
      document.cookie = `refreshToken=${state.refreshToken}; path=/; expires=${expireDate.toUTCString()}`;
     //setCookies(true);
     setState(prevState => ({
      ...prevState,
      cookies: true
    }));
    setIsLoading(false);
    toast.success("Email confirmed!");
    } if(state.loggedIn){
      return
    }

    

  }, [state.confirmed,state.loggedIn]);

/*   const [cards] = useState([
    <FlippableCard key={1} />,
    <FlippableCard key={2} />,
    <FlippableCard key={3} />,
    // Aggiungi altre card se necessario
  ]); */

  const flippableCards = qrList.map((qr, index) => (
    <FlippableCard
        key={index}
        uuid="uuid"//{qr.uuid}
        text="text"       //{qr.text}
        available={true}
        rewardType={qr.rewardModality}
        rewardAmount={qr.rewardAmount}
        objectAssociated={qr.objectAssociated}
        description={qr.description}
        contact={qr.contact}
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
    <Section className="pt-[10rem] -mt-[8.25rem] -mb-[-3rem]" crosses>
      {console.log("STATE",state)}
      {isLoading ? (
      // Mostra il codice per la pagina di caricamento se isLoading è true
      <div className="loading-page">
        <Spinner animation="border" variant="primary" />
        <p>Caricamento...</p>
      </div>
    ) : (
      <>
        {!state.confirmed && (
          // Mostra "devi autenticarti per accedere" se non sei autenticato e non hai confermato
          <div className="text-center">
            <h5 className="h5 mb-3">You need to login to access this page</h5>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        )}
        {state.confirmed && (
          // Mostra il contenuto della sezione se lo stato è confermato
          <>
            <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[0.875rem] md:mb-10 lg:mb-[1.25rem]">
              <h5 className="h5 mb-3">Welcome user, have a look at your QRs:</h5>
            </div>

            {qrList.length === 0 ? (
                <div className="text-center mb-4">
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
          {flippableCards.map((card, index) => (
            <AnimatedCard key={index} index={index} currentIndex={currentCardIndex}>
            <div className={`${index === currentCardIndex ? 'block' : 'hidden'}`}>
              {card}
            </div>
          </AnimatedCard>
          ))}
        </div>
        </div>



        <div className="absolute right-1 md:right-60 lg:right-96 xl:right-120 top-1/2 transform -translate-y-1/2">
          <button onClick={nextCard} className={`  focus:outline-none ${currentCardIndex === flippableCards.length - 1 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-200 cursor-pointer'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
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
