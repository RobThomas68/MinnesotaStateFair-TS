import React, { createContext, useEffect, useState } from "react";
import db from "../data/db.json";

export interface FoodType {
  id: string;
  name: string;
  excerpt: string;
  description: string;
}
export type FoodArrayType = Array<FoodType>;

export interface FoodContextType {
  foodSearch: string;
  setFoodSearch: React.Dispatch<React.SetStateAction<string>>;
  foodSearchResults: FoodArrayType;
  setFoodSearchResults: React.Dispatch<React.SetStateAction<FoodArrayType>>;
  foods: FoodArrayType;
  setFoods: React.Dispatch<React.SetStateAction<FoodArrayType>>;
}

export const FoodContext = createContext<FoodContextType | null>(null);

type Props = {
  children?: React.ReactNode;
};

const FoodProvider: React.FC<Props> = ({ children }) => {
  const [foodSearch, setFoodSearch] = useState("");
  const [foodSearchResults, setFoodSearchResults] = useState(
    [] as FoodArrayType
  );
  const [foods, setFoods] = useState([] as FoodArrayType);

  useEffect(() => {
    const filteredResults = foods.filter((food) =>
      food.name.toLowerCase().includes(foodSearch.toLowerCase())
    );
    setFoodSearchResults(
      filteredResults.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
    );
  }, [foods, foodSearch]);

  useEffect(() => {
    setFoods(db.foods);
  }, []);

  return (
    <FoodContext.Provider
      value={{
        foodSearch,
        setFoodSearch,
        foodSearchResults,
        setFoodSearchResults,
        foods,
        setFoods,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export default FoodProvider;
