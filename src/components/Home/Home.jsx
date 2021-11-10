import React from "react";
import Panel from "../Panel/Panel";
import ShopList from "../ShopList/ShopList";
import SlideShow from "../SlideShow/SlideShow";

const Home = () => {
  return (
    <>
      <SlideShow />
      <Panel />
      <ShopList />
    </>
  );
};

export default Home;
