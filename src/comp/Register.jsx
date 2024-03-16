import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa6';
import Section from '../components/Section';
import { Link } from 'react-router-dom';
import { BASE_PATH } from '../constants';
import toast from 'react-hot-toast';

const Register = () => {

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const { repeatPassword, ...formDataWithoutRepeatPassword } = formData;

  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError('');// Clear error on change
  };

  const handleRegister = async () => {

    //input validation:

    if (!formData.firstname.trim()) {
      setError('Name must not be empty');
      return
    }
    if (!formData.lastname.trim()) {
      setError('Surname must not be empty');
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email non valida');
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError('La password deve contenere almeno una minuscola, una maiuscola, un numero e deve essere lunga almeno 8 caratteri');
      return;
    }
    if (formData.password !== formData.repeatPassword) {
      setError('Le password non corrispondono');
      return;
    }


    try {
      // Esegui la tua richiesta al backend
      const response = await fetch(BASE_PATH+"/api/v1/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithoutRepeatPassword),
      });
      const data = await response.json();
      console.log(data);
      console.log(data.esito.codice);

      if(data.esito.codice != 200){
        toast.error(data.esito.descrizione)
        console.log("qui gestisci errore e fai anche un return ");
        return;
      }
      
      toast.success("A confirmation was sent to your email, please confirm your account", {
        style: {
          backgroundColor: '#6cb2f2', // Blue background
          color: '#ffffff', // White text
        },
      });
    } catch (error) {
      //qui usare i boundary
      console.error('Errore durante la richiesta al backend:', error);
    }
  };

  return (
    <Section >
      <div className="mx-auto flex-grow w-full mt-10 mb-10 max-w-[1200px] px-5" >
        <div className="container mx-auto border px-5 py-5 shadow-sm md:w-1/2 rounded-lg">
          <div className=" flex flex-col items-center">
            <p className="text-4xl font-bold">Register</p>
          </div>
          <form className="mt-6 flex flex-col">
          <div className="flex mb-3"> {/* Combined flex and grid for optimal alignment */}
              <div className="mr-4 w-1/2"> {/* Consistent width for small screens */}
                <label htmlFor="firstname">Your name</label>
                <input
                  id="firstname"
                  name="firstname"
                  className="mt-1 border px-4 py-2 rounded-lg bg-n-8 w-full"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2"> {/* Consistent width for small screens */}
                <label htmlFor="lastname">Your surname</label>
                <input
                  id="lastname"
                  name="lastname"
                  className="mt-1 border px-4 py-2 rounded-lg bg-n-8 w-full"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <label htmlFor="email">Email Address</label>
            <input
              name="email"
              className="mb-3 mt-3 border px-4 py-2 rounded-lg bg-n-8"
              type="email"
              placeholder="youremail@domain.com"
              value={formData.email}
                  onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              className="mb-3 mt-3 border px-4 py-2 rounded-lg bg-n-8"
              type="password"
              placeholder="•••••••"
              value={formData.password}
                  onChange={handleChange}
            />
            <label htmlFor="repeatPassword">Repeat password</label>
            <input
              name="repeatPassword"
              className="mt-3 border px-4 py-2 rounded-lg bg-n-8"
              type="password"
              placeholder="•••••••"
              value={formData.repeatPassword}
                  onChange={handleChange}
            />
            
          </form>
          {error && <p className="text-red-500">{error}</p>}
          <button className="my-5 w-full bg-white transition-colors hover:bg-gray-200 py-2 text-black rounded-md"
                   onClick={handleRegister}>
            Register
          </button>
          <p className="text-center text-gray-500 ">Or continue with social</p>
          <div className="my-5 flex gap-2">
            <button className="w-1/2 bg-white py-2 text-blue-500 rounded-md transition-colors hover:text-blue-800 hover:bg-white flex justify-center gap-4 items-center">
              <FaFacebookF />
              Facebook
            </button>
            <button className="w-1/2 bg-white py-2 text-red-500 rounded-md transition-colors hover:text-orange-500 hover:bg-white flex justify-center gap-4 items-center">
              <FcGoogle />
              Google
            </button>
          </div>
          <p className="text-center">
            Already have an account?
            <Link to="/login"><a className="text-white text-sm underline transition-colors hover:text-color-1">
              {' '}
              Login now
            </a></Link>
          </p>
        </div>
      </div>
    </Section>
  )
}

export default Register
