
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useAuthStore } from "./store/useAuthStore";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Homepage/Home";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import CodeRecived from "./pages/ForgetPassword/CodeRecived";
import NewPassword from "./pages/ForgetPassword/NewPassword";
import VerifyEmail from "./pages/Verification/verifyEmail";
import AddProducts from "./pages/AddProducts/AddProduts";
import Profile from "./pages/Profile/Profile";
import ViewBook from "./pages/ViewBook/ViewBook";
import AllBooks from "./pages/AllBooks/AllBooks";
import Favourites from "./Components/Profile/Favourites";
import OrderHistory from "./Components/Profile/OrderHistory";
import Setting from "./Components/Profile/Setting";
import AllOrders from "./Components/Profile/AllOrders";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import CategoriesPg from "./pages/CategoriesPg/CategoriesPg";
// import UpdateBook from "./pages/UpdateBook/updateBook";

function App() {
  const { checkAuth, isCheckingAuth, isAuthenticated , user } = useAuthStore();
  const role = user?.role;

  useEffect(() => {
    checkAuth(); // Check authentication on app load
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        {role === "author" && <Route path="/add-new-book" element={isAuthenticated ? <AddProducts /> : <Navigate to="/login" />} />}
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}>
        { role ==="user" ? <Route index element={<Favourites />} />  : <Route index element = {<AllOrders />}/>}
          <Route path="/profile/orderhistory" element={<OrderHistory />} />
          <Route path="/profile/settings" element={isAuthenticated? <Setting /> : <Navigate to = "/login"/>} />
        </Route>
        <Route path="/viewbook/:id" element={isAuthenticated ? <ViewBook /> : <Navigate to="/login" />} />
        <Route path="/allbooks" element={isAuthenticated ? <AllBooks /> : <Navigate to="/login" />} />
        {/* <Route path="/updatebook/:id" element={isAuthenticated ? <UpdateBook /> : <Navigate to="/login" />} /> */}
        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/categories" element={isAuthenticated ? <CategoriesPg /> : <Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/CodeRecived" element={<CodeRecived />} />
        <Route path="/newpassword/:id/:token" element={<NewPassword />} />
        <Route path="/contact" element={<Contact />} />
      </Routes> 
      <Toaster />
    </div>
  );
}

export default App;
