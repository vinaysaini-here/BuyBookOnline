// import SignIn from "./pages/SignIn/SignIn";
// import SignUp from "./pages/SignUp/SignUp";
// import Home from "./pages/Homepage/Home";
// import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
// import CodeRecived from "./pages/ForgetPassword/CodeRecived";
// import NewPassword from "./pages/ForgetPassword/NewPassword";
// import VerifyEmail from "./pages/Verification/verifyEmail";
// import { Routes, Route, Navigate } from "react-router-dom";

// import { Toaster } from "react-hot-toast";
// import { Loader } from "lucide-react"
// import { useAuthStore } from "./store/useAuthStore";
// import React, { useEffect } from "react";
// import AddProduts from "./pages/AddProducts/AddProduts";

// import NavBar from "./Components/Navbar/NavBar";
// import Profile from "./pages/Profile/Profile";
// import ViewBook from "./pages/ViewBook/ViewBook";
// import AllBooks from "./pages/AllBooks/AllBooks";
// import Favourites from "./Components/Profile/Favourites";
// import OrderHistory from "./Components/Profile/OrderHistory";
// import Setting from "./Components/Profile/Setting";
// import Contact from "./pages/Contact/Contact";
// import Cart from "./pages/Cart/Cart";
// import CategoriesPg from "./pages/CategoriesPg/CategoriesPg";
// // import { useAuthStore } from "./store/useAuthStore";


// function App() {

//   const { user, checkAuth, isCheckingAuth } = useAuthStore();
//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth,]);

//   console.log(user);

//   if (isCheckingAuth && !user) return (
//     <div className='flex items-center justify-center h-screen'>
//       <Loader className="size-10 animate-spin" />
//     </div>
//   )



//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
//         <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
//         <Route path="/login" element={!user ? <SignIn /> : <Navigate to="/" />} />
//         <Route path="/verify-email" element={<VerifyEmail />} />
//         <Route path="/forgot-password" element={<ForgetPassword />} />
//         <Route path="/CodeRecived" element={<CodeRecived />} />
//         <Route path="/newpassword/:id/:token" element={<NewPassword />} />
//         <Route path="/add-new-book" element={user ? <AddProduts /> : <Navigate to="/login" />} />
//         //new Routes
//         <Route path="/contact" element={<Contact />} />
//         {/* <Route path="/NavBar" element={<NavBar />} /> */}
//         <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />}>
//           <Route index element={user ? <Favourites /> : <Navigate to="/login" />} />
//           <Route path="/profile/orderhistory" element={user ? <OrderHistory /> : <Navigate to="/login" />} />
//           <Route path="/profile/settings" element={user ? <Setting /> : <Navigate to="/login" />} />
//         </Route>
//         <Route path="/viewbook/:id" element={user ? <ViewBook /> : <Navigate to="/login" />} />
//         <Route path="/allbooks" element={user ? <AllBooks /> : <Navigate to="/login" />} />
//         <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
//         <Route path="/categories" element={user ? <CategoriesPg /> : <Navigate to="/login" />} />
//       </Routes>
//       <Toaster />
//     </div>
//   );
// }

// export default App;



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
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import CategoriesPg from "./pages/CategoriesPg/CategoriesPg";

function App() {
  const { checkAuth, isCheckingAuth, isAuthenticated } = useAuthStore();

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
        <Route path="/add-new-book" element={isAuthenticated ? <AddProducts /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}>
          <Route index element={<Favourites />} />
          <Route path="/profile/orderhistory" element={<OrderHistory />} />
          <Route path="/profile/settings" element={isAuthenticated? <Setting /> : <Navigate to = "/login"/>} />
        </Route>
        <Route path="/viewbook/:id" element={isAuthenticated ? <ViewBook /> : <Navigate to="/login" />} />
        <Route path="/allbooks" element={isAuthenticated ? <AllBooks /> : <Navigate to="/login" />} />
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
