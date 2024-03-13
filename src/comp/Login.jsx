import React, { useState } from 'react'

import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa6';
import Section from '../components/Section';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSignIn } from 'react-auth-kit';



const Login = () => {

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signIn = useSignIn();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

     // Verifica che l'email sia valida utilizzando una regex
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
       setError('Email non valida');
       setLoading(false);
       return;
     }
 
     // Verifica i requisiti della password
     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
     if (!passwordRegex.test(password)) {
       setError('La password deve contenere almeno una minuscola, una maiuscola, un numero e deve essere lunga almeno 8 caratteri');
       setLoading(false);
       return;
     }

    try {
      // Simulazione di una richiesta di login al backend
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
        email,
        password,
      });

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {email: email}
      })
      // Dopo aver ricevuto una risposta positiva, puoi fare il redirect alla dashboard
      console.log("redirect to dashboard",response)
    } catch (error) {
      console.error('Errore durante il login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Effettua una richiesta al backend per avviare il flusso di autenticazione con Google
      const response = await axios.get('http://localhost:8080/oauth2/authorization/google');

      // Se la richiesta ha successo, reindirizza l'utente al flusso di autenticazione di Google
      window.location.href = response.data.authorizationUrl;

      console.log(response)

    } catch (error) {
      console.error('Errore durante il login con Google:', error);
      // Gestisci eventuali errori
    } finally {
      setLoading(false);
    }
  };


  return (
    <Section >
      <div className="mx-auto flex-grow w-full mt-10 mb-10 max-w-[1200px] px-5" >
        <div className="container mx-auto border px-5 py-5 shadow-sm md:w-1/2 rounded-lg">
          <div className=" flex flex-col items-center">
            <p className="text-4xl font-bold">Login</p>
          </div>
          <form className="mt-6 flex flex-col">
            <label htmlFor="email">Email Address</label>
            <input
              className="mb-3 mt-3 border px-4 py-2 rounded-lg bg-n-8"
              type="email"
              placeholder="youremail@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Password</label>
            <input
              className="mt-3 border px-4 py-2 rounded-lg bg-n-8"
              type="password"
              placeholder="•••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-4 flex justify-between">
            <a href="#" className="text-sm underline transition-colors hover:text-color-1">
              Forgot password?
            </a>
          </div>
          <button
            className="my-5 w-full bg-white transition-colors hover:bg-gray-200 py-2 text-black rounded-md"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
          <p className="text-center text-gray-500 ">Or login with social</p>
          <div className="my-5 flex gap-2">
            <button className="w-1/2 bg-white py-2 text-blue-500 rounded-md transition-colors hover:text-blue-800 hover:bg-white flex justify-center gap-4 items-center">
              <FaFacebookF />
              Facebook
            </button>
            <a href="http://localhost:8080/oauth2/authorization/google" className="w-1/2 bg-white py-2 text-red-500 rounded-md transition-colors hover:text-orange-500 hover:bg-white flex justify-center gap-4 items-center">
              <FcGoogle />
              Google
            </a>
          </div>
          <p className="text-center">
            Don`t have account?
            <Link to="/register"><a className="text-white text-sm underline transition-colors hover:text-color-1">
              {' '}
              Register now
            </a></Link>
          </p>
        </div>
      </div>
    </Section>
  );
};
export default Login
