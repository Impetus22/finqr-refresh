import React, { useEffect, useState } from 'react'
import Section from '../components/Section'
import Button from '../components/Button';
import toast from 'react-hot-toast';
import { BASE_PATH } from '../constants';
import {BsFillCheckCircleFill } from "react-icons/bs";

const Public = () => {

  const [uuid, setUuid] = useState('');
  const [qrSequenceError, setQrSequenceError] = useState('');
  const [uuidFromParam, setUuidFromParam] = useState('');
  const [searchResult, setSearchResult] = useState(null);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuidParam = urlParams.get('uuid');
    if (uuidParam) {
      setUuid(uuidParam);
      setUuidFromParam(uuidParam);
    }
  
  }, []);


  useEffect(() => {
    if(uuidFromParam){
      handleSearch();
    }

  }, [uuidFromParam]);


  const handleChange = (e) => {
    setQrSequenceError('');

    
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
    setUuid(value);
    
    // Impedisce all'utente di digitare oltre i 32 caratteri
    if (value.length >= 32) {
      e.preventDefault();
    }
  };

  const handleSearch = async () => {
    setQrSequenceError('');
    if(uuid.length !== 36){
      setQrSequenceError('invalid UUID, it must be a 32 char code');
      return;
    }

    try {
      
      const url = `${BASE_PATH}/api/v1/public/qrs/${uuid}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        setSearchResult(responseData);

        toast.success("Qr sequence found!")
        return;
      } else {
        setSearchResult(null);
        if(response.status === 404){
          toast.error("Qr sequence not found")
          return;
        }
        toast.error("Something went wrong")
      }
    } catch (error) {
      setSearchResult(null);
      //todo: gestire errore
      toast.error("Search failure")
      console.error('Search error:', error);
    } 
  };

  return (
    <Section
    className="pt-[12rem] -mt-[5.25rem]"
    crosses
    crossesOffset="lg:translate-y-[1.25rem]"
    
    id="found"
  >
    <div className="container relative">
      <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[2.875rem] md:mb-10 lg:mb-[3.25rem]">
        <h3 className="h3 mb-6">Have you found an object?</h3>

        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="rewardCode" className="block text-sm font-medium text-yellow-400">
              QR sequence
            </label>
            <input
              type="text"
              id="uuid"
              name="uuid"
              className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="12345678-abcd-abcd-abcd-123456789112"
              value={uuid}
              onChange={handleChange}
              maxLength={36}
    
    />
    {qrSequenceError && <span className="text-red-500">{qrSequenceError}</span>}

  </div>

  <Button  white onClick={handleSearch}>
    Search
  </Button>
</div>
</div>
</div>
{searchResult && (
          <div className="mt-1 max-w-md mx-auto grid grid-cols-2 gap-6 items-center"> {/* Increased gap for more space */}
            <div className="mb-2"> {/* Added margin-bottom for image */}
            <span className="flex items-center">
              <BsFillCheckCircleFill className="mr-2 text-green-500" />
                Finqr certified
            </span>
              <img src={`data:image/png;base64,${searchResult.qrSequence}`} alt="QR Code" className="rounded-lg border-4 border-green-500"/>
            </div>
            <div className="mt-2 list-disc list-inside text-white">
              
              {/* Modified each list item class to use 'text-left' and 'whitespace-normal' */}
              <li className="text-left whitespace-normal">Reward Modality: {searchResult.rewardModality}</li>
              <li className="text-left whitespace-normal">Reward Amount: {searchResult.rewardAmount}</li>
              <li className="text-left whitespace-normal">Object Associated: {searchResult.objectAssociated}</li>
              <li className="text-left whitespace-normal">Description: {searchResult.description}</li>
              <li className="text-left whitespace-normal">Name: {searchResult.name}</li>
              <li className="text-left whitespace-normal">Contact: {searchResult.contact}</li>
            </div>
          </div>
        )}
</Section>  )
}

export default Public
