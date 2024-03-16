import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Howto from '../components/Howto'
import RedeemSection from '../components/RedeemSection'
import { useNavigate } from 'react-router-dom'
import { useSignIn } from 'react-auth-kit'
import toast from 'react-hot-toast'
import axios from 'axios'

const Homepage = () => {

  const signIn = useSignIn();

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const authResponse = urlParams.get('authResponse');
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
