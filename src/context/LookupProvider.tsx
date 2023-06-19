import React, { createContext, useContext, useEffect, useState } from "react";
import db from "../data/db.json";
import { VendorContext, VendorContextType } from "./VendorProvider";

export interface ItemToVendorIDsType {
  id: string;
  vendorIDs: string[];
}
export type ItemToVendorIDsMap = Map<string, string[]>;

export interface VendorToItemIDsType {
  id: string;
  itemIDs: string[];
}
export type VendorToItemIDsMap = Map<string, string[]>;

export interface LookupContextType {
  itemToVendors: ItemToVendorIDsMap;
  setItemToVendors: React.Dispatch<React.SetStateAction<ItemToVendorIDsMap>>;
  vendorToItems: VendorToItemIDsMap;
  setVendorToItems: React.Dispatch<React.SetStateAction<VendorToItemIDsMap>>;

  itemVendorNames: (id: string) => string[];
}

export const LookupContext = createContext<LookupContextType | null>(null);

interface Props {
  children?: React.ReactNode;
}

const LookupProvider = ({ children }: Props) => {
  const [itemToVendors, setItemToVendors] = useState({} as ItemToVendorIDsMap);
  const [vendorToItems, setVendorToItems] = useState({} as VendorToItemIDsMap);

  const { vendors } = useContext(VendorContext) as VendorContextType;

  const getVendorName = (id: string) => {
    const v = vendors.find((vendor) => vendor.id === id);
    return v ? v.name : "";
  };

  const itemVendorNames = (id: string) => {
    const v = itemToVendors.get(id);
    return v ? v.map((id: string) => getVendorName(id)) : [];
  };

  useEffect(() => {
    setItemToVendors(
      new Map(db.itemToVendors.map((obj) => [obj.id, obj.vendorIDs]))
    );
    setVendorToItems(
      new Map(db.vendorToItems.map((obj) => [obj.id, obj.itemIDs]))
    );
  }, []);

  return (
    <LookupContext.Provider
      value={{
        itemToVendors,
        setItemToVendors,
        vendorToItems,
        setVendorToItems,

        itemVendorNames,
      }}
    >
      {children}
    </LookupContext.Provider>
  );
};

export default LookupProvider;
