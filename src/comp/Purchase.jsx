import React, { useState } from 'react'
import Section from '../components/Section'
import { FaStripe, FaPaypal } from 'react-icons/fa';
import { useAuth } from '../AuthProvider';
import { BASE_PATH } from '../constants';
import toast from 'react-hot-toast';

const Purchase = () => {

  const [rewardModality, setRewardModality] = useState('DEPOSIT');
  const [rewardAmount, setRewardAmount] = useState('');
  const [objectAssociated, setObjectAssociated] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const { tokens } = useAuth();
  const [error, setError] = useState('');
  const [loadingPaypal, setLoadingPaypal] = useState(false);
  const [loadingStripe, setLoadingStripe] = useState(false);



  // Funzione per gestire la sottomissione del form
  const handleSubmit = async (paymentOption) => {
    setError('');
    if (paymentOption === 'paypal') {
      setLoadingPaypal(true);
    }
    else{
      setLoadingStripe(true);
    }
    if (isNaN(parseFloat(rewardAmount)) || parseFloat(rewardAmount) <= 0) {
      setError('Please enter a valid reward amount.');
      if (paymentOption === 'paypal') {
        setLoadingPaypal(false);
      }
      else{
        setLoadingStripe(false);
      }
      return;
    }
    if (rewardAmount.trim() === '' || objectAssociated.trim() === '' || description.trim() === '' || contact.trim() === '') {
      setError('Please fill in all fields.');
      if (paymentOption === 'paypal') {
        setLoadingPaypal(false);
      }
      else{
        setLoadingStripe(false);
      }

      return;
    }

    const urlRequest = paymentOption === "paypal" ? "/api/v1/user/paypal/checkout/hosted" : "/api/v1/user/stripe/checkout/hosted";

    try {
      const response = await fetch(BASE_PATH + urlRequest, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`, // Assicurati di includere l'access token nell'intestazione
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rewardModality,rewardAmount,objectAssociated,description,contact })

      });
      const data = await response.json();
      if(response.status===200){
        window.location.href = data.checkoutUrl;

        console.log("REDIRECT:",data.checkoutUrl)
      }else{
        toast.error("error generating checkout")
      }

    } catch (error) {
      //todo gestire errori
      console.error('ERRORE', error);
    }
    finally {
      if (paymentOption === 'paypal') {
        setLoadingPaypal(false);
      } else if (paymentOption === 'stripe') {
        setLoadingStripe(false);
      }
    }
  };



  return (

    <Section className="pt-[10rem] lg:-mt-[5.25rem] -mt-[9.25rem] " crossesOffset="lg:translate-y-[5.25rem]"
    id="purchase">
      <div className="mx-auto flex-grow w-full mt-10 mb-10 max-w-[1200px] px-5">
      <div className="container mx-auto border px-5 py-5 shadow-sm md:w-1/2 rounded-lg">

          <div className=" flex flex-col items-center">
            <p className="text-4xl font-bold">Purchase your QR</p>
          </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center">
  <label htmlFor="rewardModality" className="block mb-1 md:mb-0 md:mr-4">Reward Modality:</label>
  <div>
    <label className="mr-4 flex items-center">
      <input type="radio" name="rewardModality" value="DEPOSIT" checked={rewardModality === 'DEPOSIT'} onChange={() => setRewardModality('DEPOSIT')} />
      <span className="ml-1">DEPOSIT</span>
    </label>
    <label className="flex items-center">
      <input type="radio" name="rewardModality" value="CASH" checked={rewardModality === 'CASH'} onChange={() => setRewardModality('CASH')} />
      <span className="ml-1">CASH</span>
    </label>
  </div>
</div>
          <div className="mb-4">
            <label htmlFor="rewardAmount" className="block mb-1">Reward Amount:</label>
            <input type="number" name="rewardAmount" value={rewardAmount} onChange={(e) => setRewardAmount(e.target.value)} step="0.01" className="mb-3 mt-3 border px-4 py-2 rounded-lg bg-n-8" />
          </div>
          <div className="mb-4">
            <label htmlFor="objectAssociated" className="block mb-1">Object Associated:</label>
            <input type="text" name="objectAssociated" value={objectAssociated} onChange={(e) => setObjectAssociated(e.target.value)} className="mb-3 mt-3 border px-4 py-2 rounded-lg bg-n-8" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1">Description:</label>
            <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-lg px-3 py-2 bg-n-8" />
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block mb-1">Contact:</label>
            <input type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full border  rounded-lg px-3 py-2 bg-n-8" />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-between space-x-4">
          <button
              onClick={() => handleSubmit('stripe')}
              type="button"
              className="bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-2 rounded flex items-center"
              disabled={loadingStripe}
            >
              {loadingStripe ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8v-4H4z"
                  ></path>
                </svg>
              ) : (
                <>Pay with cart <FaStripe className="ml-2" /></>
              )}
            </button>
  <button
              onClick={() => handleSubmit('paypal')}
              type="button"
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded flex items-center"
              disabled={loadingPaypal}
            >
              {loadingPaypal ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8v-4H4z"
                  ></path>
                </svg>
              ) : (
                <>Pay with PayPal <FaPaypal className="ml-2" /></>
              )}
            </button>
</div>
        </div>
      </div>
    </Section>
  )
}

export default Purchase
