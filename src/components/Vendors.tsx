import { useContext } from "react";
import { VendorContext, VendorContextType } from "../context/VendorProvider";
import { LookupContext, LookupContextType } from "../context/LookupProvider";

const Vendors = () => {
  const { vendors } = useContext(VendorContext) as VendorContextType;
  const { itemToVendors, vendorToItems } = useContext(
    LookupContext
  ) as LookupContextType;

  return (
    <main className="Vendors">
      Vendors {vendors.length} {itemToVendors.length} {vendorToItems.length}
    </main>
  );
};

export default Vendors;
