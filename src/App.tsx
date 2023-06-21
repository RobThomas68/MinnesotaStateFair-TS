import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Favorites from "./components/Favorites";
import Drinks from "./components/Drinks";
import DrinkDetails from "./components/DrinkDetails";
import Foods from "./components/Foods";
import Vendors from "./components/Vendors";
import Map from "./components/Map";

import DrinkProvider from "./context/DrinkProvider";
import FoodProvider from "./context/FoodProvider";
import VendorProvider from "./context/VendorProvider";
import LookupProvider from "./context/LookupProvider";
import FavoriteProvider from "./context/FavoriteProvider";

function App() {
  return (
    <FoodProvider>
      <DrinkProvider>
        <VendorProvider>
          <LookupProvider>
            <FavoriteProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Favorites />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="foods" element={<Foods />} />
                    <Route path="drinks" element={<Drinks />} />
                    <Route path="drink/:id" element={<DrinkDetails />} />
                    <Route path="vendors" element={<Vendors />} />
                    <Route path="map" element={<Map />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </FavoriteProvider>
          </LookupProvider>
        </VendorProvider>
      </DrinkProvider>
    </FoodProvider>
  );
}

export default App;
