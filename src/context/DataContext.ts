/*
import React, { createContext, useState, useEffect } from "react";
import db from "../data/db.json";

const DataContext = createContext({});

export interface Item {
  id: string;
  name: string;
  excerpt?: string | null;
  description?: string | null;
  directions?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}
export interface Items extends Array<Item> {}

export interface Drink {
  id: string;
  name: string;
  isNew: boolean;
  isOnlyAtFair: boolean;
}
export interface Drinks extends Array<Drink> {}

export interface Food {
  id: string;
  name: string;
  excerpt: string;
  description: string;
}
export interface Foods extends Array<Food> {}

export interface Vendor {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}
export interface Vendors extends Array<Vendor> {}

export interface ItemToVendorIDs {
  id: string;
  vendorIDs: string[];
}
export interface ItemsToVendorIDs extends Map<string, ItemToVendorIDs> {}

export interface VendorToItemIDs {
  id: string;
  itemIDs: string[];
}
export interface VendorsToItemIDs extends Map<string, VendorToItemIDs> {}

export interface Data {
  drinks: Drinks;
  foods: Foods;
  vendors: Vendors;
  itemToVendors: ItemToVendorIDs[];
  vendorToItems: VendorToItemIDs[];

}
*/

/*
export const DataProvider = ({ children }) => {
  // ---------- Favorites ----------
  // const value = localStorage.getItem("favorites");
  // const [favorites, setFavorites] = useState<Items>(
  //   typeof value === "string" ? JSON.parse(value) : []
  // );
  // const [favoriteSearch, setFavoriteSearch] = useState("");
  // const [favoriteSearchResults, setFavoriteSearchResults] = useState(
  //   [] as Items
  // );

  // const isFavorite = (item: Item) => {
  //   return favorites.includes(item);
  // };

  // const onFavoriteClick = (item: Item) => {
  //   if (isFavorite(item)) {
  //     const favs = favorites.filter((favorite) => item.id !== favorite.id);
  //     setFavorites(favs);
  //   } else {
  //     const favs = [...favorites, item];
  //     const lookup = itemToVendors.get(item.id);
  //     const vendorIDs = lookup ? lookup.vendorIDs : [];
  //     if (vendorIDs && vendorIDs.length === 1) {
  //       const vendor = vendors.find((vendor) => vendor.id === vendorIDs[0]);
  //       if (vendor && !isFavorite(vendor)) {
  //         favs.push(vendor);
  //       }
  //     }
  //     setFavorites(favs);
  //   }
  // };

  // ---------- Foods ----------
  const [foodSearch, setFoodSearch] = useState("");
  const [foodSearchResults, setFoodSearchResults] = useState([] as Foods);
  const [foods, setFoods] = useState([] as Foods);

  // ---------- Drinks ----------
  const [drinkSearch, setDrinkSearch] = useState("");
  const [drinkSearchResults, setDrinkSearchResults] = useState([] as Drinks);
  const [drinks, setDrinks] = useState([] as Drinks);
  const [isOnlyAtFair, setIsOnlyAtFair] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // ---------- Vendors ----------
  const [vendorSearch, setVendorSearch] = useState("");
  const [vendorSearchResults, setVendorSearchResults] = useState([] as Vendors);
  const [vendors, setVendors] = useState([] as Vendors);

  // ---------- Lookups ----------
  const [itemToVendors, setItemToVendors] = useState({} as ItemsToVendorIDs);
  const [vendorToItems, setVendorToItems] = useState({} as VendorsToItemIDs);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));

    const filteredResults = favorites.filter((favorite) =>
      favorite.name.toLowerCase().includes(favoriteSearch.toLowerCase())
    );
    setFavoriteSearchResults(
      filteredResults.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
    );
  }, [favorites, favoriteSearch]);

  useEffect(() => {
    setFoods(db.foods);
    setDrinks(db.drinks);
    setVendors(db.vendors);
    setItemToVendors(new Map(db.itemToVendors.map((obj) => [obj.id, obj])));
    setVendorToItems(new Map(db.vendorToItems.map((obj) => [obj.id, obj])));
  }, []);

  // ---------- Foods ----------
  useEffect(() => {
    const filteredResults = foods.filter((food) =>
      food.name.toLowerCase().includes(foodSearch.toLowerCase())
    );
    setFoodSearchResults(
      filteredResults.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
    );
  }, [foods, foodSearch]);

  // ---------- Drinks ----------
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

  // ---------- Vendors ----------
  useEffect(() => {
    const filteredResults = vendors.filter((vendor) =>
      vendor.name.toLowerCase().includes(vendorSearch.toLowerCase())
    );
    setVendorSearchResults(
      filteredResults.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
    );
  }, [vendors, vendorSearch]);

  // ---------- Item To Vendor Lookups ----------
  const getVendorName = (id: string) => {
    const vendor = vendors.find((v) => v.id === id);
    return vendor ? vendor.name : "";
  };
  const itemVendorNames = (id: string) => {
    const lookup = itemToVendors.get(id);
    return lookup ? lookup.vendorIDs.map((id) => getVendorName(id)) : [];
  };

  // ---------- Vendor To Item Lookups ----------
  const getItemVendorIDs = (id: string) => {
    const lookup = vendorToItems.get(id);
    return lookup ? lookup.itemIDs : [];
  };
  const vendorFavorites = (id: string) => {
    return favorites.filter((favorite) =>
      getItemVendorIDs(id).includes(favorite.id)
    );
  };
  const vendorFavoriteItemNames = (id: string) => {
    return vendorFavorites(id).map((favorite) => favorite.name);
  };

  return (
    <DataContext.Provider
      value={{
        favoriteSearch,
        setFavoriteSearch,
        favoriteSearchResults,
        favorites,
        isFavorite,
        onFavoriteClick,

        foodSearch,
        setFoodSearch,
        foodSearchResults,
        foods,
        setFoods,

        drinkSearch,
        setDrinkSearch,
        drinkSearchResults,
        drinks,
        setDrinks,
        isOnlyAtFair,
        setIsOnlyAtFair,
        isNew,
        setIsNew,

        vendorSearch,
        setVendorSearch,
        vendorSearchResults,
        vendors,
        setVendors,

        itemToVendors,
        vendorToItems,

        itemVendorNames,
        vendorFavoriteItemNames,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
*/
