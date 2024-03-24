import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import Cookies from "js-cookie";
  //import jwt_decode from "jwt-decode";
  import { jwtDecode } from "jwt-decode";
import { BASE_PATH } from "./constants";


  const AuthContext = createContext();

  const AuthProvider = ({ children }) => {
    // State to hold the authentication token

    const [tokens, setTokens] = useState(() => {
      // Recupera i token dai cookie
      const cookies = document.cookie.split('; ');
      const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken'));
      const refreshTokenCookie = cookies.find(cookie => cookie.startsWith('refreshToken'));
      const refreshTokenExpiresCookie = cookies.find(cookie => cookie.startsWith('refreshTokenExpires'));

      // Se sono presenti token nei cookie, restituisci gli stati con i valori dei token
      if (accessTokenCookie && refreshTokenCookie) {
        const accessToken = accessTokenCookie.split('=')[1];
        const refreshToken = refreshTokenCookie.split('=')[1];
        const accessTokenPayload = jwtDecode(accessToken);
        const name = accessTokenPayload.name;
        const accessTokenExpiresAt = accessTokenPayload.exp; // Expiry time of accessToken
        const refreshTokenExpiresAt = refreshTokenExpiresCookie.split('=')[1];

        return {
          accessToken: accessToken,
          refreshToken: refreshToken,
          name: name,
          accessTokenExpiresAt: accessTokenExpiresAt,
          refreshTokenExpiresAt: refreshTokenExpiresAt
        };}else if(refreshTokenCookie && !accessTokenCookie){
          const refreshToken = refreshTokenCookie.split('=')[1];
          const refreshTokenExpiresAt = refreshTokenExpiresCookie.split('=')[1];

          console.log("expiryyy:",refreshTokenExpiresAt)

          return {
            accessToken: '',
            refreshToken: refreshToken,
            name: '',
            accessTokenExpiresAt: 0,
            refreshTokenExpiresAt: refreshTokenExpiresAt,
          };
        }else{
          return {
            accessToken: '',
            refreshToken: '',
            name: '',
            accessTokenExpiresAt: 0,
            refreshTokenExpiresAt: 0
          };
        }
      })

// Function to set the authentication token
  const setToken = useCallback((accessToken, refreshToken) => {
      if (!accessToken || !refreshToken) {
        // Se uno dei token è vuoto, imposta direttamente i token sul valore vuoto
        setTokens({ accessToken: '', refreshToken: '', name: '' , expiration: 0, refreshTokenExpiresAt: 0});
      } else {
        // Altrimenti, decodifica il token di accesso e imposta i token normalmente
        const accessTokenPayload = jwtDecode(accessToken);
        const name = accessTokenPayload.name;
        const accessTokenExpiresAt = accessTokenPayload.exp; // Expiry time of accessToken
        const currentRefreshTokenExpiresAt = tokens.refreshTokenExpiresAt;
        const refreshTokenExpiresAt = currentRefreshTokenExpiresAt ? currentRefreshTokenExpiresAt : accessTokenExpiresAt + (23 * 60 * 60); // Refresh token expires 23 hours after accessToken

        setTokens({ accessToken, refreshToken, name, accessTokenExpiresAt,refreshTokenExpiresAt });
      }
    }, []);
  
useEffect(() => {
  console.log("HERE",tokens)
  if (tokens.accessToken !== "" && tokens.refreshToken !== "") {
    //settare anche expires, name ecc
    Cookies.set("accessToken", tokens.accessToken, { expires: new Date(tokens.accessTokenExpiresAt * 1000) });
    Cookies.set("refreshToken", tokens.refreshToken, { expires: new Date(tokens.refreshTokenExpiresAt * 1000) });
    Cookies.set("refreshTokenExpires", tokens.refreshTokenExpiresAt, { expires: new Date(tokens.refreshTokenExpiresAt * 1000) });

  } else if(tokens.refreshToken !== "" && tokens.accessToken === ""){
    Cookies.set("refreshToken", tokens.refreshToken, { expires: new Date(tokens.refreshTokenExpiresAt * 1000) });
    Cookies.set("refreshTokenExpires", tokens.refreshTokenExpiresAt, { expires: new Date(tokens.refreshTokenExpiresAt * 1000) });
  }else{
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("refreshTokenExpires");

  }
}, [tokens.accessToken, tokens.refreshToken]);

const refreshAccessToken = useCallback(async () => {
  try {
    const requestBody = {
      token: tokens.refreshToken
    };
    // Effettua una richiesta al backend per ottenere un nuovo accessToken utilizzando il refreshToken
    const response = await fetch(BASE_PATH+'/api/v1/auth/refresh/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      // Se la richiesta non ha successo, effettua il logout
      setToken('', '');
      return;
    }

    const data = await response.json();
    console.log("refresh response:",data)
    setToken(data.token, tokens.refreshToken);
  } catch (error) {
    console.error('Errore durante il refresh dell\'accessToken:', error);
    // In caso di errore, effettua il logout
    setToken('', '');
  }
}, [tokens.refreshToken, setToken]);

useEffect(() => {
  console.log(" entro 1 volta e poi...");

  if (tokens.accessToken !== "" && tokens.refreshToken !== "") {

  const checkTokenExpiration = setInterval(() => {
    const now = Math.floor(Date.now() / 1000);
    console.log("checkTokenExpiration entro token exp:",tokens.accessTokenExpiresAt);
    console.log("now:",now);
    console.log("diff:",tokens.accessTokenExpiresAt - now);

    if (tokens.accessTokenExpiresAt - now < 300) { // Refresh the token if it will expire in less than 5 minutes
      console.log("checkTokenExpiration non entro");

      refreshAccessToken();
      console.log("Refresh ogni min");
    }
  }, 60000); // Check every minute

  return () => clearInterval(checkTokenExpiration);
}
}, [tokens.accessTokenExpiresAt, refreshAccessToken]);

useEffect(() => {
  // Controlla se hai solo il refreshToken valido al momento del render
  console.log("solo refresh")
  console.log("refresh exp:",tokens.refreshTokenExpiresAt)
  console.log("now :",Math.floor(Date.now() / 1000));

  if (tokens.refreshToken && !tokens.accessToken && tokens.refreshTokenExpiresAt > Math.floor(Date.now() / 1000)) {
    // Se hai solo il refreshToken e questo è ancora valido, effettua il refresh del token
    refreshAccessToken();
  }
}, []);
  
    // Memoized value of the authentication context
    const contextValue = useMemo(
      () => ({
        tokens,
        setToken,
      }),
      [tokens]
    );
  
    // Provide the authentication context to the children components
    return (
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export default AuthProvider;