import React, { createContext, useEffect, useState } from "react";
import db from "../data/db.json";

export interface DrinkType {
  id: string;
  name: string;
  isNew: boolean;
  isOnlyAtFair: boolean;
}
export type DrinkArrayType = Array<DrinkType>;

export interface DrinkContextType {
  drinkSearch: string;
  setDrinkSearch: React.Dispatch<React.SetStateAction<string>>;
  drinkSearchResults: DrinkArrayType;
  setDrinkSearchResults: React.Dispatch<React.SetStateAction<DrinkArrayType>>;
  drinks: DrinkArrayType;
  setDrinks: React.Dispatch<React.SetStateAction<DrinkArrayType>>;
  isOnlyAtFair: boolean;
  setIsOnlyAtFair: React.Dispatch<React.SetStateAction<boolean>>;
  isNew: boolean;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DrinkContext = createContext<DrinkContextType | null>(null);

interface Props {
  children?: React.ReactNode;
}

const DrinkProvider = ({ children }: Props) => {
  const [drinkSearch, setDrinkSearch] = useState("");
  const [drinkSearchResults, setDrinkSearchResults] = useState(
    [] as DrinkArrayType
  );
  const [drinks, setDrinks] = useState([] as DrinkArrayType);
  const [isOnlyAtFair, setIsOnlyAtFair] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const filteredResults = drinks.filter(
      (drink) =>
        drink.name.toLowerCase().includes(drinkSearch.toLowerCase()) &&
        drink.isOnlyAtFair === isOnlyAtFair &&
        drink.isNew === isNew
    );
    setDrinkSearchResults(
      filteredResults.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
    );
  }, [drinks, drinkSearch, isOnlyAtFair, isNew]);

  useEffect(() => {
    setDrinks(db.drinks);
  }, []);

  return (
    <DrinkContext.Provider
      value={{
        drinkSearch,
        setDrinkSearch,
        drinkSearchResults,
        setDrinkSearchResults,
        drinks,
        setDrinks,
        isOnlyAtFair,
        setIsOnlyAtFair,
        isNew,
        setIsNew,
      }}
    >
      {children}
    </DrinkContext.Provider>
  );
};

export default DrinkProvider;
