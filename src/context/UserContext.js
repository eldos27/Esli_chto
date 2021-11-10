import axios from "axios";
import React, { useReducer } from "react";
import { calcSubPrice, calcTotalPrice } from "../Helpers/calcPrice";
import { API } from "../Helpers/constans";

export const userContext = React.createContext();

const INIT_STATE = {
  products: null,
  productsCountInCart: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).products.length
    : 0,
  cartData: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_AND_DELETE_PRODUCTS_IN_CART":
      return { ...state, productsCountInCart: action.payload };
    case "GET_CART":
      return { ...state, cartData: action.payload };
    case "BUY_PRODUCT":
      return { ...state, productsCountInCart: action.payload };
    default:
      return state;
  }
};
const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    const { data } = await axios(`${API}/shop/${window.location.search}`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: data,
    });
  };

  function addAndDeleteProductsInCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }

    let newProduct = {
      product: product,
      count: 1,
      subPrice: 0,
    };

    newProduct.subPrice = calcSubPrice(newProduct);
    let newCart = cart.products.filter(
      (item) => item.product.id === product.id
    );
    if (newCart.length > 0) {
      cart.products = cart.products.filter(
        (item) => item.product.id !== product.id
      );
    } else {
      cart.products.push(newProduct);
    }
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_AND_DELETE_PRODUCTS_IN_CART",
      payload: cart.products.length,
    });
  }

  function checkProductInCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }

    let newCart = cart.products.filter((item) => item.product.id === id);
    return newCart.length > 0 ? true : false;
  }

  function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
      };
    }
    dispatch({
      type: "GET_CART",
      payload: cart.products,
    });
  }

  function changeCountProductsInCart(count, id) {
    if (count < 0) {
      count = 1;
    }
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((item) => {
      if (item.product.id === id) {
        item.count = count;
        item.subPrice = calcSubPrice(item);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  function buyProduct() {
    localStorage.setItem("cart", null);

    dispatch({
      type: "BUY_PRODUCT",
      payload: 0,
    });
  }

  return (
    <userContext.Provider
      value={{
        products: state.products,
        cartData: state.cartData,
        productsCountInCart: state.productsCountInCart,
        getProducts,
        addAndDeleteProductsInCart,
        checkProductInCart,
        getCart,
        changeCountProductsInCart,
        buyProduct,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
