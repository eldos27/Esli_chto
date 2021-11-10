import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { shopContext } from "../../context/ShopContext";
import ShopCard from "../ShopCard.jsx/ShopCard";
import { Pagination } from "@material-ui/lab";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AOS from "aos";
import "./ShopList.css";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  card: {
    backgroundColor: "rgb(250, 250, 250, 0.1) !important",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
}));

const ShopList = () => {
  AOS.init();
  let history = useHistory();
  const params = useParams();
  const { shops, getShop, pagination } = useContext(shopContext);
  const classes = useStyles();
  const [page, setPage] = useState(getPage());

  useEffect(() => {
    getShop(history);
  }, []);

  useEffect(() => {
    setPage(getPage());
  }, [params]);

  function getPage(e, page) {
    const search = new URLSearchParams(history.location.search);
    if (!search.get("_page")) {
      return 1;
    }
    return search.get("_page");
  }

  const handlePage = (e, pageVal) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_page", pageVal);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getShop(history);
    setPage(pageVal);
  };

  return (
    <div className={classes.card}>
      <Box className={classes.container}>
        {shops ? (
          shops.map((item, index) => (
            <div data-aos="flip-left">
              <ShopCard item={item} key={index} history={history} />
            </div>
          ))
        ) : (
          <div className={classes.root}>
            <CircularProgress color="secondary" />
          </div>
        )}
      </Box>
      <Box className={classes.pagination}>
        <Pagination
          count={pagination}
          onChange={handlePage}
          page={+page}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default ShopList;
