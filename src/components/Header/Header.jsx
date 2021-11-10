import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { shopContext } from "../../context/ShopContext";
import { userContext } from "../../context/UserContext";
import Sidebar from "./Sidebar";
import Logo from "../../img/logo.png";
import "./Header.css";
import { MeetingRoom } from "@material-ui/icons";
import fire from "../../fire";
import { authContext } from "../Auth/AuthContextProvider";
import { ADMIN } from "../../Helpers/constans";
import FavoriteIcon from "@material-ui/icons/Favorite";

import AddIcon from "@material-ui/icons/Add";
import { Avatar } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    background: "transparent",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  white: {
    color: "white",
  },

  blue: {
    color: "blue!important",
    margin: "0!important",
    padding: "20!important",
  },

  back: {
    backgroundColor: "rgb(0,0,0,0)",
    boxShadow: "none",
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },

  cart: {
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    color: "white",
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    color: "white",
  },

  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Header() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [eventVal, setEventVal] = useState("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { productsCountInCart, buyProduct } = useContext(userContext);
  const { getShop, quantity, handleDelFav, getFavourute } =
    useContext(shopContext);
  const [navbar, setNavbar] = useState(false);

  const {
    user: { email },
  } = useContext(authContext);

  const heandleSerch = (e) => {
    let search = new URLSearchParams(history.location.search);
    search.set("q", e.target.value);
    search.set("_page", 1);
    history.push(`${history.location.pathname}?${search.toString()}`);
    setEventVal(e.target.value);
    getShop(history);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const goLogin = () => {
    history.push("/auth");
    handleMenuClose();
  };

  const handleLogout = () => {
    fire.auth().signOut();
    buyProduct();
    handleDelFav();
    getFavourute();
    console.log("yes");
  };

  const changeNavBackground = () => {
    if (window.scrollY >= 64) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeNavBackground);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {email ? (
        <MenuItem>E-mail: {email}</MenuItem>
      ) : (
        <MenuItem onClick={goLogin}>Регистрация</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <div className={classes.menu}>
        <div>{email ? <MenuItem>E-mail: {email}</MenuItem> : null}</div>
        <div>
          {email ? (
            <div>
              <IconButton onClick={handleLogout}>
                <MeetingRoom color="primary" className="white">
                  Выйти из аккаунта
                </MeetingRoom>
              </IconButton>
            </div>
          ) : (
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              className={classes.blue}
            >
              <AccountCircle />
            </IconButton>
          )}
        </div>
        <div>
          <Link to="/fav">
            <IconButton className={classes.blue}>
              <Badge badgeContent={quantity} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Link>
        </div>
        <div>
          <IconButton
            onClick={() => history.push("/cart")}
            className={`${classes.cart} ${classes.blue}`}
          >
            <Badge badgeContent={productsCountInCart} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </div>
    </Menu>
  );

  return (
    <div>
      <AppBar className={navbar ? "navbar active" : classes.back}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Sidebar getShop={getShop} />
          </IconButton>
          <Typography className={classes.title} noWrap>
            <Link to="">
              {" "}
              <img className="logo" src={Logo} alt="" />
            </Link>
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={heandleSerch}
              value={eventVal}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div
            className={classes.sectionDesktop}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="adaption">
              <Link to="/fav">
                <IconButton className={classes.white}>
                  <Badge badgeContent={quantity} color="secondary">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
              </Link>
            </div>
            <IconButton
              onClick={() => history.push("/cart")}
              className={classes.sectionDesktop}
            >
              <Badge badgeContent={productsCountInCart} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {email === ADMIN ? (
              <div>
                <IconButton>
                  <Link to="/add">
                    <AddIcon className="white" />
                  </Link>
                </IconButton>
              </div>
            ) : null}
            <div className="adaption">
              {email ? (
                <div style={{ display: "flex" }}>
                  <IconButton onClick={handleProfileMenuOpen}>
                    <Avatar>{email.slice(0, 1).toUpperCase()}</Avatar>
                  </IconButton>
                  <IconButton onClick={handleLogout}>
                    <MeetingRoom className="white">
                      Выйти из аккаунта
                    </MeetingRoom>
                  </IconButton>
                </div>
              ) : (
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              )}
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
