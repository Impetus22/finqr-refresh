import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Howto from '../components/Howto'
import RedeemSection from '../components/RedeemSection'
import { useNavigate } from 'react-router-dom'
import { useSignIn } from 'react-auth-kit'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../AuthProvider'
import { BASE_PATH } from '../constants'

const Homepage = () => {

  const signIn = useSignIn();
  const { setToken } = useAuth();
  const navigate = useNavigate();



  async function fetchData(confToken) {
    try {
      const response = await fetch(BASE_PATH + `/api/v1/auth/register/confirm?confirmationToken=${confToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      if(data && data.esito.descrizione === "OK - success"){
        setToken(data.token,data.refreshToken);
        toast.success("Email confirmed!");
        navigate("/dashboard");
      }
      else if(data && data.esito.descrizione !== "OK - success"){
        toast.error(data.esito.descrizione);
      }
    } catch (error) {
      //gestire errore
    }
  }

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const confToken = urlParams.get('confirmationToken');
    if (confToken) {
      console.log(confToken)
      fetchData(confToken);
/*       urlParams.delete('confirmationToken');
      // Aggiorna l'URL senza il parametro 'confirmationToken'
      window.history.replaceState({}, document.title, `${window.location.pathname}${urlParams.toString()}`); */
    }
    
    const urlParamss = new URLSearchParams(window.location.search);
    const authResponse = urlParamss.get('authResponse');
    console.log(authResponse);
    if (authResponse) {
      toast.success("Login")
      signIn({
        token: authResponse.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {email: "prova"}
      })
    }
  }, []);
  return (
    <>
        <Hero />
        <Howto />
        <RedeemSection />
    </>
  )
}

export default Homepage
