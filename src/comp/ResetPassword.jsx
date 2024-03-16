import React, { useEffect, useState } from 'react'
import Section from '../components/Section';
import { BASE_PATH } from '../constants';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResetPassword = () => {

    const navigate = useNavigate();

    const [token, setToken] = useState(null);

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const confToken = urlParams.get('confToken');
        if (confToken) {
            setToken(confToken);
        }
      }, []);

    const handleResetPassword = async () => {
        
        setError('');
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
          setError('La password deve contenere almeno una minuscola, una maiuscola, un numero e deve essere lunga almeno 8 caratteri');
          return;
        }
        if (password !== newPassword) {
          setError('Le password non corrispondono');
          return;
        }

        try {
            // Esegui la tua richiesta al backend
            const response = await fetch(BASE_PATH+"/api/v1/auth/user/savePassword", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token, newPassword }),
            });
            const data = await response.json();
            console.log(data);
            console.log(data.esito.codice);
      
            if(data.esito.codice != 200){
              toast.error(data.esito.descrizione)
              console.log("qui gestisci errore e fai anche un return ");
              return;
            }
            navigate('/login');
            toast.success("Reset password succeffull");
          } catch (error) {
            //qui usare i boundary
            console.error('Errore durante la richiesta al backend:', error);
          }
    }

  return (
    <Section >
      <div className="mx-auto flex-grow w-full mt-10 mb-10 max-w-[1200px] px-5" >
        <div className="container mx-auto border px-5 py-5 shadow-sm md:w-1/2 rounded-lg">
          <div className=" flex flex-col items-center">
            <p className="text-4xl font-bold">Reset password</p>
          </div>
          <form className="mt-6 flex flex-col">
            <label htmlFor="password">New password</label>
            <input
              className="mb-3 mt-3 border px-4 py-2 rounded-lg bg-n-8"
              type="password"
              placeholder="youremail@domain.com"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="email">Repeat new password</label>
            <input
              className="mt-3 border px-4 py-2 rounded-lg bg-n-8"
              type="password"
              placeholder="•••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </form>
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="my-5 w-full bg-white transition-colors hover:bg-gray-200 py-2 text-black rounded-md"
            onClick={handleResetPassword}
            //disabled={!confirmationToken} // Disabilita il pulsante se confirmationToken è nullo

          >
            Reset
          </button>
        </div>
      </div>
      
    </Section>
  )
}

export default ResetPassword
