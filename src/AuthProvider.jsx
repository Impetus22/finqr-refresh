import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import Cookies from "js-cookie";
  //import jwt_decode from "jwt-decode";
  import { jwtDecode } from "jwt-decode";


  const AuthContext = createContext();

  const AuthProvider = ({ children }) => {
    // State to hold the authentication token

    const [tokens, setTokens] = useState(() => {
      // Recupera i token dai cookie
      const cookies = document.cookie.split('; ');
      const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken'));
      const refreshTokenCookie = cookies.find(cookie => cookie.startsWith('refreshToken'));


      // Se sono presenti token nei cookie, restituisci gli stati con i valori dei token
      if (accessTokenCookie && refreshTokenCookie) {
        const accessToken = accessTokenCookie.split('=')[1];
        const refreshToken = refreshTokenCookie.split('=')[1];
        const accessTokenPayload = jwtDecode(accessToken);
        const name = accessTokenPayload.name;

        return {
          accessToken: accessToken,
          refreshToken: refreshToken,
          name: name
        };}else{
          return {
            accessToken: '',
            refreshToken: '',
            name: ''
          };
        }
      })
  
    // Function to set the authentication token
    const setToken = (accessToken, refreshToken) => {
      const accessTokenPayload = jwtDecode(accessToken);
      const name = accessTokenPayload.name;
      setTokens({accessToken, refreshToken, name});
    };
  
useEffect(() => {
  if (tokens.accessToken !== "" && tokens.refreshToken !== "") {
    //settare anche expires, name ecc
    Cookies.set("accessToken", tokens.accessToken);
    Cookies.set("refreshToken", tokens.refreshToken);
  } else {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }
}, [tokens.accessToken, tokens.refreshToken]);
  
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