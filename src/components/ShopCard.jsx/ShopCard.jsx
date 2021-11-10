import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import { useContext } from "react";
import { shopContext } from "../../context/ShopContext";
import { Link, useHistory } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { userContext } from "../../context/UserContext";
import "./ShopCard.css";
import { ADMIN } from "../../Helpers/constans";
import { authContext } from "../Auth/AuthContextProvider";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  root: {
    marginTop: "5vh",
    width: "290px",
    backgroundColor: "rgba(250,250,250,0.4)",
  },

  cardTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "150px",
  },
  media: {
    height: "150px",
    backgroundSize: "contain",
  },
});

export default function ShopCard({ item }) {
  const classes = useStyles();
  const {
    deleteShop,
    editShop,
    handleDetail,
    handleFavourite,
    checkFavourite,
  } = useContext(shopContext);
  const history = useHistory();
  const { addAndDeleteProductsInCart, checkProductInCart } =
    useContext(userContext);

  const {
    user: { email },
  } = useContext(authContext);

  const test = (e) => {
    console.log(e.target);
  };

  function handleClick() {
    history.push("/credit");
  }

  return (
    <Card elevation={10} className={classes.root}>
      <Link to="/detail">
        <CardActionArea onClick={() => handleDetail(item.id)}>
          <CardMedia
            className={classes.media}
            image={item.image}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.cardTitle}>
            <Typography gutterBottom variant="h5" component="h2">
              {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.description}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {item.price} сом
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        {email === ADMIN ? (
          <>
            <Link to="/edit">
              <IconButton onClick={() => editShop(item.id)}>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton onClick={() => deleteShop(item.id, history)}>
              <DeleteIcon />
            </IconButton>
          </>
        ) : null}
        <IconButton onClick={handleClick} className="buy">
          Купить
        </IconButton>
        <IconButton
          onClick={() => handleFavourite(item.id)}
          color={checkFavourite(item.id) ? "secondary" : "primary"}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          variant="contained"
          color={checkProductInCart(item.id) ? "secondary" : "primary"}
          onClick={() => addAndDeleteProductsInCart(item)}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
