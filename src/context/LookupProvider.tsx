import React, { createContext, useEffect, useState } from "react";
import db from "../data/db.json";

export interface ItemToVendorIDsType {
  id: string;
  vendorIDs: string[];
}
export type ItemToVendorIDsMap = Map<string, ItemToVendorIDsType>;
export type ItemToVendorIDsMapArray = Array<ItemToVendorIDsMap>;

export interface VendorToItemIDsType {
  id: string;
  itemIDs: string[];
}
export type VendorToItemIDsMap = Map<string, VendorToItemIDsType>;
export type VendorToItemIDsMapArray = Array<VendorToItemIDsMap>;

export interface LookupContextType {
  itemToVendors: ItemToVendorIDsMapArray;
  setItemToVendors: React.Dispatch<
    React.SetStateAction<ItemToVendorIDsMapArray>
  >;
  vendorToItems: VendorToItemIDsMapArray;
  setVendorToItems: React.Dispatch<
    React.SetStateAction<VendorToItemIDsMapArray>
  >;
}

export const LookupContext = createContext<LookupContextType | null>(null);

type Props = {
  children?: React.ReactNode;
};

const LookupProvider: React.FC<Props> = ({ children }) => {
  const [itemToVendors, setItemToVendors] = useState(
    [] as ItemToVendorIDsMapArray
  );
  const [vendorToItems, setVendorToItems] = useState(
    [] as VendorToItemIDsMapArray
  );

  useEffect(() => {
    const itemToVendorsArray = new Array(
      new Map(db.itemToVendors.map((obj) => [obj.id, obj]))
    );
    setItemToVendors(itemToVendorsArray);
    const vendorToItemsArray = new Array(
      new Map(db.vendorToItems.map((obj) => [obj.id, obj]))
    );
    setVendorToItems(vendorToItemsArray);
  }, []);

  return (
    <LookupContext.Provider
      value={{
        itemToVendors,
        setItemToVendors,
        vendorToItems,
        setVendorToItems,
      }}
    >
      {children}
    </LookupContext.Provider>
  );
};

export default LookupProvider;
