import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
import { processItems, sortByRawTimeLeft } from "./processData";

const test = [{id: 30, itemName: 'Parth', expiryDate: '2023-11-25', dateNow: '1700922242989'},
              {id: 32, itemName: 'hey', expiryDate: '2023-11-09', dateNow: '1700932616264'}]

const ItemList = ({ items, removeItem }) => {
  // const [addButtonPressed, setAddButtonPressed] = useState(false);
  // const [deleteButtonPressed, setDeleteButtonPressed] = useState(false);
  const [foodData, setFoodData] = useState(null);

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setFoodData(
        foodData.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  const displayTimeLeft = (time) => {
    if (time < 0) {
      return "NONE"
    }
    return Math.ceil(time / 86400000)
  }

  useEffect(() => {
    axios.get("http://localhost:3001/foods")
    .then((response) => {
      // setFoodData(sortByRawTimeLeft(processItems(foodData)));
      // console.log(sortByRawTimeLeft(processItems(foodData)));
      setFoodData(sortByRawTimeLeft(processItems(response.data)));
      // if (foodData !== null) {
      //   console.log(processItems(foodData));
      // }
      // console.log(processItems(test));
      // console.log(sortByRawTimeLeft(processItems(foodData)).id);
    });
  }, [items]);

  return (
    <div>
      {foodData && <ul>
        <h2>Expired</h2>
        {foodData.filter((food) => {
          return food.state == "Expired";
        }).map((foodData) => (
          <li key={foodData.id}>
            <div>
              <strong>{foodData.itemName}</strong>
              <p>Time Left: {displayTimeLeft(foodData.rawTimeLeft)}</p>
            </div>
            <button onClick={() => deleteFood(foodData.id)}>Remove</button>
          </li>
        ))}
        <h2>Warning</h2>
        {foodData.filter((food) => {
          return food.state == "Warning";
        }).map((foodData) => (
          <li key={foodData.id}>
            <div>
              <strong>{foodData.itemName}</strong>
              <p>Time Left: {displayTimeLeft(foodData.rawTimeLeft)}</p>
            </div>
            <button onClick={() => deleteFood(foodData.id)}>Remove</button>
          </li>
        ))}
        <h2>Safe</h2>
        {foodData.filter((food) => {
          return food.state == "Safe";
        }).map((foodData) => (
          <li key={foodData.id}>
            <div>
              <strong>{foodData.itemName}</strong>
              <p>Time Left: {displayTimeLeft(foodData.rawTimeLeft)}</p>
            </div>
            <button onClick={() => deleteFood(foodData.id)}>Remove</button>
          </li>
        ))}
      </ul>}
    </div>
  );
};

export default ItemList;