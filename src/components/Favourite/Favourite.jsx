import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "200px",
    margin: "10px",
  },
  media: {
    width: "100px",
    height: "100px",
    backgroundSize: "contain!important",
    backgroundRepeat: "no-repeat!important",
    backgroundPosition: "center!important",
    margin: "0 auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Favourite({
  item,
  handleFavourite,
  checkFavourite,
  handleDetail,
}) {
  const classes = useStyles();

  return (
    <Card elevation={10} className={classes.root}>
      <CardHeader
        action={
          <Link to="/detail">
            <IconButton
              onClick={() => handleDetail(item.id)}
              aria-label="settings"
            >
              <MoreVertIcon />
            </IconButton>
          </Link>
        }
        title={item.title}
        subheader={item.price}
      />
      <div
        className={classes.media}
        style={{ background: `url(${item.image})` }}
      ></div>

      <CardActions disableSpacing>
        <IconButton
          color={checkFavourite(item.id) ? "secondary" : "primary"}
          onClick={() => handleFavourite(item.id)}
          aria-label="add to favorites"
        >
          <FavoriteIcon />
        </IconButton>
        <Link to="/credit">
          <IconButton className="buy" aria-label="share">
            Купить
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}
