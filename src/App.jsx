import { RequireAuth } from "react-auth-kit";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Contact from "./comp/Contact";
import Dashboard from "./comp/Dashboard";
import Found from "./comp/Found";
import Homepage from "./comp/Homepage";
import Login from "./comp/Login";
import Public from "./comp/Public";
import Purchase from "./comp/Purchase";
import Register from "./comp/Register";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./comp/ResetPassword";


const App = () => {
  return (
     <>
             <Toaster position="top-right"/>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header/>
          <Routes>
            <Route path="/home" element={<Homepage/>}></Route>
            <Route path="/found" element={<Found/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/public" element={<Public/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/purchase" element={<Purchase/>}></Route>
            <Route path="/password/reset" element={<ResetPassword/>}></Route>

          </Routes>
        <Footer />
      </div>
      <ButtonGradient />
    </> 
  );
};

export default App