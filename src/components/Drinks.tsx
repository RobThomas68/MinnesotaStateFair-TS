import { useContext } from "react";
import { DrinkContext, DrinkContextType } from "../context/DrinkProvider";

const Drinks = () => {
  const { drinks } = useContext(DrinkContext) as DrinkContextType;
  return <main className="Drinks">Drinks {drinks.length}</main>;
};

export default Drinks;
