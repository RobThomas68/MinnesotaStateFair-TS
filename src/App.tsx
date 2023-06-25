import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Favorites from "./components/Favorites";
import Drinks from "./components/Drinks";
import DrinkDetails from "./components/DrinkDetails";
import Foods from "./components/Foods";
import Vendors from "./components/Vendors";
import Map from "./components/Map";
import Lab from "./components/Lab";
import Login from "./components/Login";
import RequireAuth from "./components/ReauireAuth";

import AuthProvider from "./context/AuthProvider";
import DrinkProvider from "./context/DrinkProvider";
import FoodProvider from "./context/FoodProvider";
import VendorProvider from "./context/VendorProvider";
import LookupProvider from "./context/LookupProvider";
import FavoriteProvider from "./context/FavoriteProvider";

function App() {
  return (
    <AuthProvider>
      <FoodProvider>
        <DrinkProvider>
          <VendorProvider>
            <LookupProvider>
              <FavoriteProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      {/* public routes */}
                      <Route path="login" element={<Login />} />

                      {/* private routes */}
                      <Route element={<RequireAuth />}>
                        <Route index element={<Favorites />} />
                      </Route>

                      <Route element={<RequireAuth />}>
                        <Route path="favorites" element={<Favorites />} />
                      </Route>

                      <Route element={<RequireAuth />}>
                        <Route path="foods" element={<Foods />} />
                      </Route>

                      <Route element={<RequireAuth />}>
                        <Route path="drinks" element={<Drinks />} />
                      </Route>

                      <Route element={<RequireAuth />}>
                        <Route path="drink/:id" element={<DrinkDetails />} />
                      </Route>

                      <Route element={<RequireAuth />}>
                        <Route path="vendors" element={<Vendors />} />
                      </Route>

                      <Route element={<RequireAuth />}>
                        <Route path="map" element={<Map />} />
                      </Route>

                      <Route element={<RequireAuth />}>
                        <Route path="lab" element={<Lab />} />
                      </Route>
                    </Route>
                  </Routes>
                </BrowserRouter>
              </FavoriteProvider>
            </LookupProvider>
          </VendorProvider>
        </DrinkProvider>
      </FoodProvider>
    </AuthProvider>
  );
}

export default App;
