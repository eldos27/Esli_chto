import { Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { shopContext } from "../../context/ShopContext";
import Favourite from "./Favourite";

const Favourit = () => {
  const {
    favourite,
    handleFavourite,
    checkFavourite,
    getFavourute,
    handleDetail,
  } = useContext(shopContext);

  useEffect(() => {
    getFavourute();
  }, []);
  console.log(favourite);
  return (
    <div className="content">
      <div className="container">
        {favourite.length > 0 ? (
          favourite.map((item, index) => (
            <Favourite
              handleDetail={handleDetail}
              handleFavourite={handleFavourite}
              checkFavourite={checkFavourite}
              item={item}
              key={index}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h2" gutterBottom className="empty-style">
              <p
                style={{
                  backgroundColor: "black",
                  fontWeight: "bold",
                  opacity: "0.7",
                  boxShadow: "0 0 50px black",
                  padding: "10px",
                }}
              >
                Нет избранных товаров
              </p>
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourit;
