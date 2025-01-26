import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Homepage/Home";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import CodeRecived from "./pages/ForgetPassword/CodeRecived";
import NewPassword from "./pages/ForgetPassword/NewPassword";
import VerifyEmail from "./pages/Verification/verifyEmail";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStore";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AddProduts from "./pages/AddProducts/AddProduts";

import NavBar from "./Components/Navbar/NavBar";
import Profile from "./pages/Profile/Profile";
import ViewBook from "./pages/ViewBook/ViewBook";
import AllBooks from "./pages/AllBooks/AllBooks";
import Favourites from "./Components/Profile/Favourites";
import OrderHistory from "./Components/Profile/OrderHistory";
import Setting from "./Components/Profile/Setting";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import CategoriesPg from "./pages/CategoriesPg/CategoriesPg";

function App() {
  //   const getUser = useAuthStore((state) => state.getUser);

  //   // Wrap the `getUser` method in `useCallback` to ensure a stable reference
  //   const fetchUser = React.useCallback(async () => {
  //     await getUser();
  //   }, []);

  //   React.useEffect(() => {
  //     fetchUser(); // Call the wrapped function
  //   }, [fetchUser]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/CodeRecived" element={<CodeRecived />} />
        <Route path="/newpassword/:id/:token" element={<NewPassword />} />
        <Route path="/add-new-book" element={<AddProduts />} />
        //new Routes
        <Route path="/contact" element={<Contact />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Favourites />} />
          <Route path="/profile/orderhistory" element={<OrderHistory />} />
          <Route path="/profile/settings" element={<Setting />} />
        </Route>
        <Route path="/viewbook" element={<ViewBook />} />
        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<CategoriesPg />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
