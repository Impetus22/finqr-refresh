import ButtonGradient from "./assets/svg/ButtonGradient";

import Footer from "./components/Footer";
import Header from "./components/Header";

import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthProvider";
import Routes from "./Routes";


const App = () => {
  return (
     <>
             <Toaster position="top-right"/>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <AuthProvider>

        <Routes>

        </Routes>

        </AuthProvider>
      </div>
      <ButtonGradient />
    </> 
  );
};

export default App
