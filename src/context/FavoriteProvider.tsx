import React, { createContext, useContext, useEffect, useState } from "react";
import { VendorContext, VendorContextType } from "./VendorProvider";
import { LookupContext, LookupContextType } from "./LookupProvider";

export interface FavoriteType {
  id: string;
  name: string;
  excerpt?: string;
  description?: string;
  directions?: string;
  latitude?: number;
  longitude?: number;
}
export type FavoriteArrayType = Array<FavoriteType>;

export interface FavoriteContextType {
  favoriteSearch: string;
  setFavoriteSearch: React.Dispatch<React.SetStateAction<string>>;
  favoriteSearchResults: FavoriteArrayType;
  setFavoriteSearchResults: React.Dispatch<
    React.SetStateAction<FavoriteArrayType>
  >;
  favorites: FavoriteArrayType;
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteArrayType>>;
  isFavorite: (favorite: FavoriteType) => boolean;
  onFavoriteClick: (favorite: FavoriteType) => void;

  vendorFavoriteItemNames: (id: string) => string[];
}

export const FavoriteContext = createContext<FavoriteContextType | null>(null);

interface Props {
  children?: React.ReactNode;
}

const FavoriteProvider = ({ children }: Props) => {
  const { vendors } = useContext(VendorContext) as VendorContextType;
  const { itemToVendors, vendorToItems } = useContext(
    LookupContext
  ) as LookupContextType;

  const [favoriteSearch, setFavoriteSearch] = useState("");

  const [favoriteSearchResults, setFavoriteSearchResults] = useState(
    [] as FavoriteArrayType
  );

  // const [favorites, setFavorites] = useState([] as FavoriteArrayType);
  const [favorites, setFavorites] = useState(
    (JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as FavoriteArrayType) || ([] as FavoriteArrayType)
  );

  const isFavorite = (favorite: FavoriteType) => {
    return favorites.includes(favorite);
  };

  const onFavoriteClick = (favorite: FavoriteType) => {
    if (isFavorite(favorite)) {
      const favs = favorites.filter((f) => favorite.id !== f.id);
      setFavorites(favs);
    } else {
      const favs = [...favorites, favorite];
      const vendorIDs = itemToVendors.get(favorite.id) ?? [];
      if (vendorIDs && vendorIDs.length === 1) {
        const vendor = vendors.find((vendor) => vendor.id === vendorIDs[0]);
        if (vendor && !isFavorite(vendor)) {
          favs.push(vendor);
        }
      }
      setFavorites(favs);
    }
  };

  const getItemVendorIDs = (id: string) => {
    return vendorToItems.get(id) ?? [];
  };

  const vendorFavorites = (id: string) => {
    return favorites.filter((favorite) =>
      getItemVendorIDs(id).includes(favorite.id)
    );
  };

  const vendorFavoriteItemNames = (id: string) => {
    return vendorFavorites(id).map((favorite) => favorite.name);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));

    const filteredResults = favorites.filter((favorite) =>
      favorite.name.toLowerCase().includes(favoriteSearch.toLowerCase())
    );
    setFavoriteSearchResults(
      filteredResults.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
    );
  }, [favorites, favoriteSearch]);

  return (
    <FavoriteContext.Provider
      value={{
        favoriteSearch,
        setFavoriteSearch,
        favoriteSearchResults,
        setFavoriteSearchResults,
        favorites,
        setFavorites,

        isFavorite,
        onFavoriteClick,

        vendorFavoriteItemNames,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
