import { useContext } from "react";
import { FoodContext, FoodContextType } from "../context/FoodProvider";

const Foods = () => {
  const { foods } = useContext(FoodContext) as FoodContextType;
  return <main className="Foods">Foods {foods.length}</main>;
};

export default Foods;
