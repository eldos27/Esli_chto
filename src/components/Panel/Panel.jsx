import React, { useContext } from "react";
import { shopContext } from "../../context/ShopContext";
import { useHistory } from "react-router-dom";
import "./Panel.css";

export default function Panel() {
  const history = useHistory();
  const { getShop } = useContext(shopContext);

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

  return (
    <div className="panel">
      <div className="panel__row">
        <div className="panel__col">
          <button
            className="panel__button"
            data-name="снаряды"
            onClick={handleOnClikCategory}
          >
            Снаряды
          </button>
        </div>
        <div className="panel__col">
          <button
            className="panel__button"
            data-name="футболка"
            onClick={handleOnClikCategory}
          >
            Футболки
          </button>
        </div>
        <div className="panel__col">
          <button
            className="panel__button"
            data-name="зимний"
            onClick={handleOnClikCategory}
          >
            Зимний спорт
          </button>
        </div>
        <div className="panel__col">
          <button
            className="panel__button"
            data-name="шорты"
            onClick={handleOnClikCategory}
          >
            Шорты
          </button>
        </div>
        <div></div>
        <div className="panel__col">
          <button
            className="panel__button"
            data-name="все"
            onClick={handleOnClikCategory}
          >
            Все
          </button>
        </div>
      </div>
    </div>
  );
}
