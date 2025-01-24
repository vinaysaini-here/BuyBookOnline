import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Homepage/home";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import CodeRecived from "./pages/ForgetPassword/CodeRecived";
import NewPassword from "./pages/ForgetPassword/NewPassword";
import VerifyEmail from "./pages/Verification/verifyEmail";
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import AddProduts from "./pages/AddProducts/AddProduts";



function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/CodeRecived" element={<CodeRecived />} />
        <Route path="/newpassword/:id/:token" element={<NewPassword />} />
        <Route path="/add-new-book" element={<AddProduts />} />


        //new Routes 

      </Routes>
      < Toaster />
    </div>
  );
}

export default App;
