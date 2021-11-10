import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory, Link } from "react-router-dom";
import "./Sidebar.css";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function Sidebar({ getShop }) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleOnClikCategory = (e) => {
    const search = new URLSearchParams(history.location.search);

    switch (e.target.dataset.name) {
      case "снаряды":
        search.set("category", e.target.dataset.name);
        search.set("_page", 1);
        history.push(`${history.location.pathname}?${search.toString()}`);
        break;
      case "футболка":
        search.set("category", e.target.dataset.name);
        search.set("_page", 1);
        history.push(`${history.location.pathname}?${search.toString()}`);
        break;
      case "зимний":
        search.set("category", e.target.dataset.name);
        search.set("_page", 1);
        history.push(`${history.location.pathname}?${search.toString()}`);
        break;
      case "шорты":
        search.set("category", e.target.dataset.name);
        search.set("_page", 1);
        history.push(`${history.location.pathname}?${search.toString()}`);
        break;
      case "все":
        history.push(`${history.location.pathname.replace("category")}`);
        break;
      default:
        history.push(`${history.location.pathname.replace("category")}`);
        break;
    }

    getShop(history);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="sidebar__buttons">
        <List>
          <Link to="/">
            <button className="sidebar__button">На Главную</button>
          </Link>
        </List>
        <Divider />
        <List>
          <button
            onClick={handleOnClikCategory}
            className="sidebar__button"
            data-name="снаряды"
          >
            Снаряды
          </button>
        </List>
        <Divider />
        <List>
          <button
            onClick={handleOnClikCategory}
            className="sidebar__button"
            data-name="футболка"
          >
            Футболки
          </button>
        </List>
        <Divider />
        <List>
          <button
            onClick={handleOnClikCategory}
            className="sidebar__button"
            data-name="зимний"
          >
            Зимний спорт
          </button>
        </List>
        <Divider />
        <List>
          <button
            onClick={handleOnClikCategory}
            className="sidebar__button"
            data-name="шорты"
          >
            Шорты
          </button>
        </List>
        <Divider />
        <List>
          <button
            onClick={handleOnClikCategory}
            className="sidebar__button"
            data-name="все"
          >
            Все
          </button>
        </List>
      </div>
      <Divider />
    </div>
  );

  return (
    <div className="sidebar">
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
