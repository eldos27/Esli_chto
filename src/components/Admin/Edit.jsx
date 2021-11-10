import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, ButtonGroup, Paper } from "@material-ui/core";
import { useState } from "react";
import { useContext } from "react";
import { shopContext } from "../../context/ShopContext";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },

  Paper: {
    display: "flex",
    flexDirection: "column",
    width: "800px",
    height: "600px",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "100px auto",
  },

  p: {
    margin: "0",
  },

  inp: {
    width: "100px",
  },
}));

export default function Edit() {
  const { edit, saveShop } = useContext(shopContext);
  const classes = useStyles();
  const [inpValue, setInpValue] = useState("");
  const [category, setCatygory] = useState("");
  const history = useHistory();
  useEffect(() => {
    setInpValue(edit);
    setCatygory(edit.category);
  }, [edit]);

  const handleChange = (e) => {
    let obj = {
      ...inpValue,
      category,
      [e.target.name]: e.target.value,
    };

    setInpValue(obj);
  };

  const handlevalueCategory = (e) => {
    setCatygory(e.target.value.toLowerCase());
  };

  const handleEdit = () => {
    saveShop(inpValue, inpValue.id, history);

    setInpValue({
      title: "",
      image: "",
      price: "",
      category: "",
      description: "",
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Paper elevation={10} className={classes.Paper}>
        <p className={classes.p}>Title</p>
        <TextField
          value={inpValue.title}
          name="title"
          onChange={handleChange}
          multiline
        />
        <p className={classes.p}>image</p>
        <TextField
          value={inpValue.image}
          name="image"
          onChange={handleChange}
          multiline
        />
        <p className={classes.p}>category</p>
        <TextField
          value={category}
          name="category"
          onChange={handlevalueCategory}
        />
        <p className={classes.p}>description</p>
        <TextField
          value={inpValue.description}
          name="description"
          onChange={handleChange}
        />
        <p className={classes.p}>price</p>
        <TextField
          value={inpValue.price}
          name="price"
          type="number"
          onChange={handleChange}
        />
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button onClick={handleEdit}>Save</Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button>Close</Button>
          </Link>
        </ButtonGroup>
      </Paper>
    </form>
  );
}
