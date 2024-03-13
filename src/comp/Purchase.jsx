import React, { useState } from 'react'
import Section from '../components/Section'
import { FaStripe, FaPaypal } from 'react-icons/fa';

const Purchase = () => {

  const [rewardModality, setRewardModality] = useState('DEPOSIT');
  const [rewardAmount, setRewardAmount] = useState('');
  const [objectAssociated, setObjectAssociated] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');

  // Funzione per gestire la sottomissione del form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Esegui qui la logica per inviare i dati del form
  };



  return (
    <Section className="pt-[10rem] lg:-mt-[5.25rem] -mt-[9.25rem] ">
      <div className="mx-auto flex-grow w-full mt-10 mb-10 max-w-[1200px] px-5">
      <div className="container mx-auto border px-5 py-5 shadow-sm md:w-1/2 rounded-lg">

          <div className=" flex flex-col items-center">
            <p className="text-4xl font-bold">Purchase your QR</p>
          </div>

        <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
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
          <div className="flex justify-between space-x-4">
  <button type="submit" className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-2 rounded flex items-center">
    Pay with cart <FaStripe className="ml-2" />
  </button>
  <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded flex items-center">
    Pay with PayPal <FaPaypal className="ml-2" />
  </button>
</div>
        </form>
        </div>
      </div>
    </Section>
  )
}

export default Purchase
