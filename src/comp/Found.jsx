import React, { useState } from 'react'
import Section from '../components/Section'
import Button from '../components/Button';
import { BASE_PATH } from '../constants';
import toast from 'react-hot-toast';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { AiOutlineExclamationCircle } from 'react-icons/ai';


const Found = () => {

  const [rewardCode, setRewardCode] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [rewardCodeError, setRewardCodeError] = useState('');
  const [paypalEmailError, setPaypalEmailError] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);


  const handleChange = (e) => {
    let value = e.target.value.replace(/-/g, ''); // Rimuove tutti i trattini presenti
    
    // Controlla se la lunghezza del valore senza trattini supera 32 caratteri
    if (value.length > 32) {
      value = value.slice(0, 32); // Limita il valore a 32 caratteri
    } else {
      // Inserisce il trattino dopo il primo gruppo di 8 caratteri
      if (value.length > 8) {
        value = `${value.slice(0, 8)}-${value.slice(8)}`;
      }
      // Inserisce il trattino dopo il secondo gruppo di 12 caratteri
      if (value.length > 13) {
        value = `${value.slice(0, 13)}-${value.slice(13)}`;
      }
      // Inserisce il trattino dopo il terzo gruppo di 16 caratteri
      if (value.length > 18) {
        value = `${value.slice(0, 18)}-${value.slice(18)}`;
      }
      // Inserisce il trattino dopo il quarto gruppo di 21 caratteri
      if (value.length > 23) {
        value = `${value.slice(0, 23)}-${value.slice(23)}`;
      }
    }
    
    // Imposta il valore dell'UUID formattato
    setRewardCode(value);
    
    // Impedisce all'utente di digitare oltre i 32 caratteri
    if (value.length >= 32) {
      e.preventDefault();
    }
  };
  
  const handleSubmit = async () => {
    setRewardCodeError('');
    setPaypalEmailError('');

    if(rewardCode.length !== 36){
      setRewardCodeError('invalid UUID, it must be a 32 char code');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paypalEmail)) {
      setPaypalEmailError('Invalid email');
      return;
    }
    setShowConfirmationModal(true);
    disablePageScroll();


  };

  const handleConfirm = async () => {
    try {
      
      const url = `${BASE_PATH}/api/v1/found/payment?codiceUUID=${rewardCode}&accountPayPal=${paypalEmail}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Reward successfully redeemed, congrats for your gesture")
        return;
      } else {
        if(response.status === 404){
          toast.error("Reward redeem code not found")
          return;
        }
        toast.error("Reward failure")
      }
    } catch (error) {
      //todo: gestire errore
      toast.error("Reward failure")
      console.error('Redeem error:', error);
    } finally {
      enablePageScroll();
      setShowConfirmationModal(false);

    }
  };
  const handleCancel = () => {
    setShowConfirmationModal(false);
    enablePageScroll(); // Riabilita lo scroll quando la modale viene chiusa
  };

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      
      id="found"
    >
      <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">Have you found and returned an object?</h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-1 lg:mb-8">
            Fill in the form below with the secret reward code and your paypal account to redeem your reward
          </p>

          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="rewardCode" className="block text-sm font-medium text-yellow-400">
                Reward Code
              </label>
              <input
                type="text"
                id="rewardCode"
                name="rewardCode"
                className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="12345678-abcd-abcd-abcd-123456789112"
                value={rewardCode}
        onChange={handleChange}
        maxLength={36} // Lunghezza massima dell'UUID con trattini
              />
              {rewardCodeError && <span className="text-red-500">{rewardCodeError}</span>}

            </div>
            <div className="mb-6">
              <label htmlFor="paypalEmail" className="block text-sm font-medium text-yellow-400">
                PayPal Email
              </label>
              <input
                type="email"
                id="paypalEmail"
                name="paypalEmail"
                className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your PayPal email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
              />
                {paypalEmailError && <span className="text-red-500">{paypalEmailError}</span>}

            </div>

            <Button  white onClick={handleSubmit}>
              Redeem
            </Button>
          </div>
        </div>
      </div>

      {showConfirmationModal && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-center">
            <AiOutlineExclamationCircle className="text-red-500 h-6 w-6 mr-2 sm:mr-4" />
            <h3 className="text-lg leading-6 font-medium text-white">Attention required</h3>
          </div>
          <div className="mt-2 sm:text-left">
            <p className="text-sm text-gray-300 mb-2">The payment will be sent to the PayPal account specified: {paypalEmail}, be sure it is correct</p>

            <button
              className="w-full bg-white hover:bg-gray-200 hover:text-blue-800 text-black py-2 rounded-md"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
        <div className="bg-slate-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-200 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleCancel}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </Section>
  )
}

export default Found
