import { Button, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useHistory } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import CreditCardTwoToneIcon from "@material-ui/icons/CreditCardTwoTone";
import "./CreditCard.css";
import { Alert } from "@material-ui/lab";

const CreditCard = () => {
  const [focus, setFocus] = useState("");
  const [handler, setHandler] = useState(false);
  const [inpValue, setInpValue] = useState({
    number: "",
    cvc: "",
    expiry: "",
    name: "",
  });

  function handleInpValue(e) {
    if (e.target.name === "number") {
      if (e.target.value.toString().length > 16) {
        return;
      }
    }
    if (e.target.name === "cvc") {
      if (e.target.value.toString().length > 3) {
        return;
      }
    }
    if (e.target.name === "expiry") {
      if (e.target.value.toString().length > 4) {
        return;
      }
    }

    let obj = {
      ...inpValue,
      [e.target.name]: e.target.value,
    };
    setInpValue(obj);
  }

  useEffect(() => {
    handleValidInputs();
  }, [inpValue]);

  function handleValidInputs() {
    if (
      inpValue.number.length === 16 &&
      inpValue.cvc.length === 3 &&
      inpValue.expiry.length === 4 &&
      inpValue.name.length > 0
    ) {
      setHandler(true);
      // console.log("true");
    } else {
      setHandler(false);
      // console.log("false");
    }
  }

  const history = useHistory();
  const { buyProduct } = useContext(userContext);

  const handleClick = () => {
    buyProduct();
    history.push("/");
    alert("Спасибо за покупку!");
  };

  return (
    <div className="content content-form">
      <Typography
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
        }}
        variant="h2"
        gutterBottom
      >
        <p
          style={{
            backgroundColor: "black",
            fontWeight: "bold",
            opacity: "0.7",
            boxShadow: "0 0 50px black",
            padding: "10px",
          }}
        >
          Форма оплаты
        </p>
      </Typography>
      <Cards
        number={inpValue.number}
        name={inpValue.name}
        expiry={inpValue.expiry}
        cvc={inpValue.cvc}
        focused={focus}
      />
      <form className="credit-form">
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={inpValue.number}
          maxLength="16"
          onChange={handleInpValue}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="text"
          name="name"
          placeholder="Card Holder Name"
          value={inpValue.name}
          onChange={handleInpValue}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="tel"
          name="expiry"
          placeholder="MM/YY Expiry"
          value={inpValue.expiry}
          maxLength="4"
          onChange={handleInpValue}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="tel"
          name="cvc"
          placeholder="CVC"
          value={inpValue.cvc}
          maxLength="3"
          onChange={handleInpValue}
          onFocus={(e) => setFocus(e.target.name)}
        />
      </form>
      {handler ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2vh",
          }}
        >
          <Button
            endIcon={<CreditCardTwoToneIcon />}
            variant="contained"
            onClick={handleClick}
            color="secondary"
          >
            Оплатить
          </Button>
        </div>
      ) : (
        <div className="credit-form" style={{ marginBottom: "2vh" }}>
          <Alert severity="error">Заполните все поля</Alert>
        </div>
      )}
    </div>
  );
};

export default CreditCard;
