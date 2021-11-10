import Mail from "@material-ui/icons/Mail";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { API } from "../Helpers/constans";
export const shopContext = React.createContext();

const INIT_STATE = {
  shops: [],
  edit: [],
  pagination: 1,
  detail: [],
  favourite: [],
  quantity: 0,
};

const reduce = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_SHOP":
      return {
        ...state,
        shops: action.payload.data,
        pagination: Math.ceil(action.payload.headers["x-total-count"] / 10),
      };

    case "SHOP_EDIT":
      return {
        ...state,
        edit: action.payload,
      };

    case "SHOP_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_FAVOURUTE":
      return {
        ...state,
        favourite: action.payload,
      };
    case "FAV_QUANTITY":
      return {
        ...state,
        quantity: action.payload,
      };
    default:
      return state;
  }
};

const ShopContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reduce, INIT_STATE);

  const getShop = async (history) => {
    getFavourute();
    const search = new URLSearchParams(history.location.search);
    search.set("_limit", 10);
    history.push(`${history.location.pathname}?${search.toString()}`);

    let data = await axios(`${API}/shop${window.location.search}`);

    dispatch({
      type: "GET_SHOP",
      payload: data,
    });
  };

  const shopAdd = async (newObj, history) => {
    await axios.post(`${API}/shop`, newObj);

    getShop(history);
  };

  const deleteShop = async (id, history) => {
    await axios.delete(`${API}/shop/${id}`);

    getShop(history);
  };

  const editShop = async (id) => {
    let { data } = await axios(`${API}/shop/${id}`);

    dispatch({
      type: "SHOP_EDIT",
      payload: data,
    });
  };

  const saveShop = async (newObj, id, history) => {
    await axios.patch(`${API}/shop/${id}`, newObj);
    getShop(history);
  };

  const handleDetail = async (id) => {
    let { data } = await axios(`${API}/shop/${id}`);
    dispatch({
      type: "SHOP_DETAIL",
      payload: data,
    });
  };

  const getFavourute = async () => {
    let { data } = await axios(`${API}/favourite`);

    dispatch({
      type: "GET_FAVOURUTE",
      payload: data,
    });

    dispatch({
      type: "FAV_QUANTITY",
      payload: data.length,
    });
  };

  const handleFavourite = async (id) => {
    let { data } = await axios(`${API}/shop/${id}`);

    let newArr = state.favourite.filter((item) => item.id === data.id);

    newArr.length > 0
      ? await axios.delete(`${API}/favourite/${id}`)
      : await axios.post(`${API}/favourite`, data);

    getFavourute();
  };

  const checkFavourite = (id) => {
    let newArr = state.favourite.filter((item) => item.id === id);

    return newArr.length > 0 ? true : false;
  };

  const handleDelFav = () => {
    state.favourite.map((item) => {
      axios.delete(`${API}/favourite/${item.id}`);
      console.log("yes");
    });
  };

  return (
    <shopContext.Provider
      value={{
        shops: state.shops,
        edit: state.edit,
        pagination: state.pagination,
        detail: state.detail,
        favourite: state.favourite,
        quantity: state.quantity,
        shopAdd,
        getShop,
        deleteShop,
        saveShop,
        editShop,
        handleDetail,
        handleFavourite,
        checkFavourite,
        getFavourute,
        handleDelFav,
      }}
    >
      {children}
    </shopContext.Provider>
  );
};

export default ShopContextProvider;
