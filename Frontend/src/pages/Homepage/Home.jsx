import React from "react";
import NavBar from "../../Components/Navbar/NavBar";
import HomeMain from "../../Components/HomePg/HomeMain";
import Featured from "../../Components/HomePg/Featured";
import Categories from "../../Components/HomePg/Categories";
import MostPolular from "../../Components/HomePg/MostPolular";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <NavBar />
      <HomeMain />
      <Featured />
      <Categories />
      <MostPolular />
      <Footer />
    </div>
  );
};

export default Home;
