import finqrlogo from '../assets/finqr-logo-header.png'; //TODO: mettere logo
import {BASE_PATH, navigation} from "../constants";
import {navigationLogged} from "../constants";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useState } from 'react';
import MenuSvg from '../assets/svg/MenuSvg';
import { HamburgerMenu } from './design/Header';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { useAuth } from '../AuthProvider';
import { FaUser } from 'react-icons/fa';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';



const Header = () => {
    const { tokens, setToken } = useAuth();

    const navigate = useNavigate();

    const pathname = useLocation();
    const [openNavigation, setOpenNavigation] = useState(false);
    const toggleNavigation = () =>{
        if(openNavigation){
            setOpenNavigation(false);
            enablePageScroll();
        } else{
            setOpenNavigation(true);
            disablePageScroll();
        }
    };
    const handleClick = () => {
        if(!openNavigation) return;
        enablePageScroll();
        setOpenNavigation(false);
    }

    const handleClickLoad = (url) => {
        /* if (url === '/dashboard') {
            window.location.href = `${url}?refresh=${Date.now()}`;
        } */
      };

      const handleLogout = async () => {
        try {
            const requestBody = {
                token: tokens.refreshToken
              };
          const response = await fetch(BASE_PATH+'/api/v1/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${tokens.accessToken}`,
              'Content-Type': 'application/json'

            },
            body: JSON.stringify(requestBody)
          });
          const data = await response.json();
          console.log("logout:",data)
          if (response.ok) {
            // Se la chiamata API ha successo, effettua il logout localmente
            setToken('', ''); // Imposta i token su vuoti
            toast.success("Logout success");
            navigate("/home");
        } else {
            // TODO: Se la chiamata API fallisce, gestisci l'errore di conseguenza
            toast.error("Cannot logout",data.esito.descrizione)
            console.error('Logout failed:', response.statusText);
          }
        } catch (error) {
            toast.error("Cannot logout")
          console.error('Logout error:', error);
        }
      };

  return (
    <div className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"}`}>
        <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
            <img src={finqrlogo} width={190} height={40} alt="finQR"/>
        </a>
        <nav className={`${openNavigation ? "flex" : "hidden"} fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>
            <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {tokens.accessToken && tokens.refreshToken ? navigationLogged.map((item) => (
                            <Link to = {item.url} onClick={() => handleClickLoad(item.url)}><a key={item.id} onClick={handleClick} className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden":""} px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url ===pathname.hash ? "z-2 lg:text-n-1" : "lg:text-n-1/50"} lg:leading-5 lg:hover:text-n-1 xl:px-12`} >
                                {item.title}
                            </a>
                            </Link>
                        )) : navigation.map((item) => (
                            <Link to = {item.url} onClick={() => handleClickLoad(item.url)}><a key={item.id} onClick={handleClick} className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden":""} px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url ===pathname.hash ? "z-2 lg:text-n-1" : "lg:text-n-1/50"} lg:leading-5 lg:hover:text-n-1 xl:px-12`} >
                                {item.title}
                            </a>
                            </Link>
                        ))}
            </div>
            <HamburgerMenu></HamburgerMenu>
        </nav>
        {tokens.accessToken && tokens.refreshToken ? (<><Link to = "/profile">
        <a className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block">
        <FaUser className="inline-block mr-1" /> {/* Icona del profilo */}
            {tokens.name}</a>
        </Link>
        <Button className="hidden lg:flex" onClick={handleLogout}>Logout</Button>
        <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
            <MenuSvg openNavigation={openNavigation}/>
        </Button></>) : (<><Link to = "/register">
        <a className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block">Register</a>
        </Link>
        <Link to = "/login"><Button className="hidden lg:flex" href="/login">Login</Button></Link>
        <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
            <MenuSvg openNavigation={openNavigation}/>
        </Button> </>)}
        </div>
    </div>

  )
}

export default Header
