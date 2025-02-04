// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/useAuthStore";

// const NavBar = () => {
//   const { user} = useAuthStore();
//   const navigate = useNavigate();
//   const handleSignIn = () => {
//     navigate("/login");
//   };
//   const handleHome = () => {
//     navigate("/");
//   };
//   const handleCart = () => {
//     navigate("/cart");
//   };
//   const handleAllbooks = () => {
//     navigate("/allbooks");
//   };
//   const handleContact = () => {
//     navigate("/contact");
//   };
//   const handleCategories = () => {
//     navigate("/categories");
//   };
//   const handleProfile = () => {
//     navigate("/profile");
//   };
//   const [MobileNav, setMobileNav] = useState("hidden");

//   return (
//     <div>
//       <div className="w-full h-16 bg-secondary flex justify-between items-center px-6 md:px-12 lg:px-40 text-lg text-white">
//         <p className="text-2xl font-bold">BuyBookOnline</p>
//         <div className="hidden md:flex justify-between items-center space-x-7">
//           <p
//             onClick={handleHome}
//             className="cursor-pointer relative hover:after:w-full after:transition-all after:duration-300 after:block after:h-0.5 after:w-0 after:bg-white"
//           >
//             Home
//           </p>
//           <p
//             onClick={handleAllbooks}
//             className="cursor-pointer relative hover:after:w-full after:transition-all after:duration-300 after:block after:h-0.5 after:w-0 after:bg-white"
//           >
//             Books
//           </p>
//           <p
//             onClick={handleCategories}
//             className="cursor-pointer relative hover:after:w-full after:transition-all after:duration-300 after:block after:h-0.5 after:w-0 after:bg-white"
//           >
//             Categories
//           </p>
//           {!user ? (
//             <p
//               onClick={() => handleContact()}
//               className="cursor-pointer relative hover:after:w-full after:transition-all after:duration-300 after:block after:h-0.5 after:w-0 after:bg-white"
//             >
//               Contact
//             </p>
//           ) : (
//             <p
//               onClick={handleCart}
//               className="cursor-pointer relative hover:after:w-full after:transition-all after:duration-300 after:block after:h-0.5 after:w-0 after:bg-white"
//             >
//               Cart
//             </p>
//           )}
//         </div>

//         <div className="hidden md:flex items-center space-x-7">
//           {!user ? (
//             <button
//               onClick={() => handleSignIn()}
//               className="bg-secondary text-white w-20 rounded-md border-white p-1 border-2 cursor-pointer hover:text-secondary hover:bg-white hover:font-semibold"
//             >
//               Sign In
//             </button>
//           ) : (
//             <button
//               onClick={handleProfile}
//               className="bg-secondary text-white w-20 rounded-md border-white p-1 border-2 cursor-pointer hover:text-secondary hover:bg-white hover:font-semibold"
//             >
//               Profile
//             </button>
//           )}
//         </div>

//         <div className="md:hidden">
//           <button
//             onClick={() =>
//               MobileNav === "hidden"
//                 ? setMobileNav("block")
//                 : setMobileNav("hidden")
//             }
//             className="text-white text-2xl cursor-pointer"
//           >
//             &#9776;
//           </button>
//         </div>
//       </div>
//       <div
//         className={`${MobileNav} w-full bg-secondary flex flex-col space-y-4 px-6 py-4 text-lg text-white md:hidden items-center`}
//       >
//         <p onClick={handleHome} className="cursor-pointer hover:underline ">
//           Home
//         </p>
//         <p onClick={handleAllbooks} className="cursor-pointer hover:underline">
//           Books
//         </p>
//         <p
//           onClick={handleCategories}
//           className="cursor-pointer hover:underline"
//         >
//           Categories
//         </p>
//         <p
//           onClick={() => handleContact()}
//           className="cursor-pointer hover:underline"
//         >
//           Contact
//         </p>
//         <button
//           onClick={() => handleSignIn()}
//           className="bg-secondary text-white w-full rounded-md border-white p-2 border-2 cursor-pointer hover:text-secondary hover:bg-white hover:font-semibold"
//         >
//           Sign In
//         </button>
//         <button
//           onClick={handleProfile}
//           className="bg-secondary text-white w-full rounded-md border-white p-1 border-2 cursor-pointer hover:text-secondar hover:bg-white hover:font-semibold"
//         >
//           Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NavBar;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const NavBar = () => {
  const { isAuthenticated, logout , user } = useAuthStore();
  const navigate = useNavigate();
  const [MobileNav, setMobileNav] = useState(false);
  const role = user?.role;
  // console.log(role);
  

  const handleNavigation = (path) => {
    navigate(path);
    setMobileNav(false); // Close mobile menu after navigation
  };

  return (
    <div>
      {/* Navbar */}
      <div className="w-full h-16 bg-secondary flex justify-between items-center px-6 md:px-12 lg:px-40 text-lg text-white">
        <p className="text-2xl font-bold cursor-pointer" onClick={() => handleNavigation("/")}>
          BuyBookOnline
        </p>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-7">
          <p onClick={() => handleNavigation("/")} className="cursor-pointer hover:underline">Home</p>
          <p onClick={() => handleNavigation("/allbooks")} className="cursor-pointer hover:underline">Books</p>
          <p onClick={() => handleNavigation("/categories")} className="cursor-pointer hover:underline">Categories</p>
          {!isAuthenticated ? (
            <p onClick={() => handleNavigation("/contact")} className="cursor-pointer hover:underline">Contact</p>
          ) : (
            <p onClick={() => handleNavigation("/cart")} className="cursor-pointer hover:underline">Cart</p>
          )}
        </div>

        {/* Profile / Auth Buttons */}
        <div className="hidden md:flex items-center space-x-5">
          {!isAuthenticated ? (
            <button
              onClick={() => handleNavigation("/login")}
              className="bg-white text-secondary px-4 py-1 rounded-md border-2 border-white hover:bg-secondary hover:text-white"
            >
              Sign In
            </button>
          ) : (
            <>
              <button
                onClick={() => handleNavigation("/profile")}
                className="bg-white text-secondary px-4 py-1 rounded-md border-2 border-white hover:bg-secondary hover:text-white"
              >
                 {role === "author" ? "Author's Profile" : "Profile"}
              </button>
              <button
                onClick={logout}
                className="bg-white text-secondary px-4 py-1 rounded-md border-2 border-white hover:bg-secondary hover:text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileNav(!MobileNav)} className="md:hidden text-white text-2xl">
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {MobileNav && (
        <div className="md:hidden w-full bg-secondary flex flex-col space-y-4 px-6 py-4 text-lg text-white items-center">
          <p onClick={() => handleNavigation("/")} className="cursor-pointer hover:underline">Home</p>
          <p onClick={() => handleNavigation("/allbooks")} className="cursor-pointer hover:underline">Books</p>
          <p onClick={() => handleNavigation("/categories")} className="cursor-pointer hover:underline">Categories</p>
          {!isAuthenticated ? (
            <p onClick={() => handleNavigation("/contact")} className="cursor-pointer hover:underline">Contact</p>
          ) : (
            <p onClick={() => handleNavigation("/cart")} className="cursor-pointer hover:underline">Cart</p>
          )}
          {!isAuthenticated ?  (
            <button
              onClick={() => handleNavigation("/login")}
              className="bg-white text-secondary w-full py-2 rounded-md border-2 border-white hover:bg-secondary hover:text-white"
            >
              Sign In
            </button>
          ) : ( 
            <>
              <button
                onClick={() => handleNavigation("/profile")}
                className="bg-white text-secondary w-full py-2 rounded-md border-2 border-white hover:bg-secondary hover:text-white"
              >
                 {role === "author" ? "Author's Profile" : "Profile"}
              </button>
              <button
                onClick={logout}
                className="bg-red-500 text-white w-full py-2 rounded-md border-2 border-red-500 hover:bg-white hover:text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;

