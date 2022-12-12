// delete this later
import HomePic from "./../../asserts/homepage.png";
import "./styles.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Recipe from "../Recipe";
import Alert from "../Alert";

function Directory({ data }) {
  
  const [searchInput, setSearchInput] = useState([]);
  const handleChange = (event) => 
  {
    const enteredword = event.target.value.toLowerCase();

    const newFilter = data.filter((value) => {
      return value.fields.item_name.toLowerCase().includes(enteredword);
    });

    if (enteredword === "") {
      setSearchInput("");
    } else {
      setSearchInput(newFilter);
    }
  };

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
    } else {
      setAlert("Please fill the form");
    }
  };

  const onChange = (e) => setQuery(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="directory">
      <div className="wrap">
        <div className="recipes">
          {recipes !== [] &&
            recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
        </div>
        <div className="item" style={{ backgroundImage: `url(${HomePic})` }}>
          {/* Search bar */}
          <h1>
            <form onSubmit={onSubmit} className="search-form">
              {alert !== "" && <Alert alert={alert} />}
              <input
                type="text"
                name="query"
                onChange={onChange}
                value={query}
                autoComplete="off"
                placeholder="Search Food"
              />
              <input type="submit" value="Search" />
            </form>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Directory;
