import React, { createContext, useEffect, useState } from "react";
import db from "../data/db.json";

export interface VendorType {
  id: string;
  name: string;
  directions: string;
  latitude: number;
  longitude: number;
}
export type VendorArrayType = Array<VendorType>;

export interface VendorContextType {
  vendorSearch: string;
  setVendorSearch: React.Dispatch<React.SetStateAction<string>>;
  vendorSearchResults: VendorArrayType;
  setVendorSearchResults: React.Dispatch<React.SetStateAction<VendorArrayType>>;
  vendors: VendorArrayType;
  setVendors: React.Dispatch<React.SetStateAction<VendorArrayType>>;
}

export const VendorContext = createContext<VendorContextType | null>(null);

interface Props {
  children?: React.ReactNode;
}

const VendorProvider = ({ children }: Props) => {
  const [vendorSearch, setVendorSearch] = useState("");
  const [vendorSearchResults, setVendorSearchResults] = useState(
    [] as VendorArrayType
  );
  const [vendors, setVendors] = useState([] as VendorArrayType);

  useEffect(() => {
    const filteredResults = vendors.filter((vendor) =>
      vendor.name.toLowerCase().includes(vendorSearch.toLowerCase())
    );
    setVendorSearchResults(
      filteredResults.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
    );
  }, [vendors, vendorSearch]);

  useEffect(() => {
    setVendors(db.vendors);
  }, []);

  return (
    <VendorContext.Provider
      value={{
        vendorSearch,
        setVendorSearch,
        vendorSearchResults,
        setVendorSearchResults,
        vendors,
        setVendors,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

export default VendorProvider;
