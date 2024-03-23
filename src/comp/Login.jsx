import React, { useState } from 'react'

import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa6';
import Section from '../components/Section';
import { Link, useNavigate } from 'react-router-dom';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import toast from 'react-hot-toast';
import { BASE_PATH } from '../constants';
import { useAuth } from '../AuthProvider';



const Login = () => {
  const { setToken } = useAuth();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const [emailToReset, setEmailToReset] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setShowModal(true);
    disablePageScroll();
  };

  const handleModalClose = () => {
    setShowModal(false);
    enablePageScroll();
    setErrorEmail('');
    setEmailToReset('');

  };
  const handleEmailChange = (e) => {
    setEmailToReset(e.target.value);
  };

  const handleSendEmail = async () => {
    // Aggiungi qui la logica per inviare l'email di recupero password
    setErrorEmail('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToReset)) {
      setErrorEmail('Email non valida');
      setLoading(false);
      return;
    }
    try {
      // Simulazione di una richiesta di login al backend

      const response = await fetch(BASE_PATH+`/api/v1/auth/user/resetPassword?email=${emailToReset}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      if (response.status === 200) {
        //todo settare cookie con tempo giusto ecc..
        toast.success("A reset link was sent to your email, please follow the instructions", {
          style: {
            backgroundColor: '#6cb2f2', // Blue background
            color: '#ffffff', // White text
          },
        });

} else{
  if(response.status === 403){
    toast.error(responseData.esito.descrizione);
    return;
  }
  if(response.status === 404){
    toast.error("Email not found in our server");
    return;
  }
  //todo err boundary
  toast.error("Something went wrong");
  return;
}
      // Dopo aver ricevuto una risposta positiva, puoi fare il redirect alla dashboard
      console.log(response)
    } catch (error) {
      console.error('Errore durante il reset della password:', error);
    } finally {
          setShowModal(false);
          enablePageScroll();
    }
    // Chiudi la modale dopo l'invio dell'email
  };



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
      const response = await fetch(BASE_PATH+"/api/v1/auth/logon", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response)

      const responseData = await response.json();
      console.log(responseData)

      if (response.status === 200) {
              //todo settare cookie con tempo giusto ecc..
        setToken(responseData.token,responseData.refreshToken);

        toast.success("Login success");
        navigate('/dashboard');

      } else{
        if(response.status === 403){
          toast.error(responseData.esito.descrizione);
          return;
        }
        toast.error("Invalid Email or password");
        return;
      }
    } catch (error) {
      toast.error("Login error");
      console.error('Errore durante il login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
    className="pt-[10rem] -mt-[5.25rem]"
    crosses
    crossesOffset="lg:translate-y-[5.25rem]"
    id="login"
  >
      <div className="mx-auto flex-grow w-full mt-0 mb-2 max-w-[1200px] px-5" >
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
            <a href="#" className="text-sm underline transition-colors hover:text-color-1"   onClick={handleModalOpen}>
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
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-white">Recupera password</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-300 mb-2">Inserisci la tua email:</p>
                      <input
                        type="email"
                        className="border rounded-lg w-full px-4 py-2 mb-4"
                        placeholder="youremail@domain.com"
                        value={emailToReset}
                        onChange={handleEmailChange}
                      />
                      {errorEmail && <p className="text-red-500">{errorEmail}</p>}

                      <button
                        className="w-full bg-white hover:bg-gray-200 hover:text-blue-800 text-black py-2 rounded-md"
                        onClick={handleSendEmail}
                      >
                        Invia
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-200 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleModalClose}
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};
export default Login
