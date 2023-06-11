import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Favorites from "./components/Favorites";
import Drinks from "./components/Drinks";
import Foods from "./components/Foods";
import Vendors from "./components/Vendors";
import Map from "./components/Map";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Favorites />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="foods" element={<Foods />} />
          <Route path="drinks" element={<Drinks />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="map" element={<Map />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
