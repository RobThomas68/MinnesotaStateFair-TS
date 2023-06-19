import { useContext } from "react";

import { VendorContext, VendorContextType } from "../context/VendorProvider";
import VendorFeed from "./VendorFeed";

const Vendors = () => {
  const { vendorSearchResults, vendorSearch, setVendorSearch } = useContext(
    VendorContext
  ) as VendorContextType;

  return (
    <>
      <div className="searchBar">
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">Search Vendors</label>
          <input
            id="search"
            type="search"
            placeholder="Search Vendors"
            value={vendorSearch}
            onChange={(e) => setVendorSearch(e.target.value)}
          />
        </form>
      </div>
      <main className="Vendors">
        {vendorSearchResults.length ? (
          <VendorFeed feedItems={vendorSearchResults} />
        ) : (
          <p style={{ marginTop: "2rem" }}>No vendors to display.</p>
        )}
      </main>
    </>
  );
};

export default Vendors;
