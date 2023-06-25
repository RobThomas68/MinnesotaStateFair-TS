import { useContext } from "react";
import { DrinkContext, DrinkContextType } from "../context/DrinkProvider";
import {
  FavoriteContext,
  FavoriteContextType,
} from "../context/FavoriteProvider";
import { FoodContext, FoodContextType } from "../context/FoodProvider";
import { LookupContext, LookupContextType } from "../context/LookupProvider";
import { VendorContext, VendorContextType } from "../context/VendorProvider";

export const useDrinks = () => useContext(DrinkContext) as DrinkContextType;
export const useFavorites = () =>
  useContext(FavoriteContext) as FavoriteContextType;
export const useFoods = () => useContext(FoodContext) as FoodContextType;
export const useLookups = () => useContext(LookupContext) as LookupContextType;
export const useVendors = () => useContext(VendorContext) as VendorContextType;
