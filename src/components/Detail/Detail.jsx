import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useContext } from "react";
import { shopContext } from "../../context/ShopContext";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link } from "react-router-dom";
import "./Detail.css";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: "70vw",
      height: "70vh",
    },
  },

  paper: {
    position: "relative",

    backgroundColor: "rgb(250, 250, 250, 0.7) !important",
  },

  root2: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  img2: {
    width: "100%",
    height: "100%",
    backgroundSize: "contain!important",
    backgroundRepeat: "no-repeat!important",
    backgroundPosition: "center!important",
  },

  static: {
    fontSize: "4vh",
  },

  dinamic: {
    paddingLeft: "2vh",
    fontSize: "3vh",
  },

  text: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  iconCancle: {
    position: "absolute",
    top: "15px",
    right: "15px",
  },
  button: {
    width: "30px",
    height: "30px",
  },
  col: {
    width: "50%",
    height: "100%",
  },

  icon: {
    display: "flex",
  },
}));

export default function Derail() {
  const classes = useStyles();
  const { detail, handleFavourite, checkFavourite } = useContext(shopContext);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={10}>
        <div className={`${classes.root2} card`}>
          <div className={`${classes.col} col`}>
            <div
              className={classes.img2}
              style={{
                background: `url(${detail.image})`,
              }}
            ></div>
          </div>
          <div className={`${classes.col} col`}>
            <CardContent className={classes.text}>
              <div className={classes.iconCancle}>
                <Link to="/">
                  <IconButton>
                    <CancelIcon className={classes.button} />
                  </IconButton>
                </Link>
              </div>
              <div>
                <span className={classes.static}>Title</span>
                <span className={classes.dinamic}>{detail.title}</span>{" "}
              </div>
              <div>
                <span className={classes.static}>Description</span>
                <span className={classes.dinamic}>{detail.description}</span>
              </div>
              <div>
                <span className={classes.static}>Price</span>
                <span className={classes.dinamic}>{detail.price} сом</span>{" "}
              </div>
              <div className={classes.icon}>
                <Link to="/credit">
                  <IconButton className="buy">Купить</IconButton>
                </Link>
                <IconButton
                  color={checkFavourite(detail.id) ? "secondary" : "primary"}
                  onClick={() => handleFavourite(detail.id)}
                  aria-label="add to favorites"
                >
                  <FavoriteIcon />
                </IconButton>
              </div>
            </CardContent>
          </div>
        </div>
      </Paper>
    </div>
  );
}
