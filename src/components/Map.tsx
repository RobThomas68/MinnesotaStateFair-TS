// import { useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  // Circle,
  ScaleControl,
  // useMap,
} from "react-leaflet";

import markerIconGreenUrl from "../resources/images/leaflet-color-markers/marker-icon-green.png";
import markerIco2xGreenUrl from "../resources/images/leaflet-color-markers/marker-icon-2x-green.png";

// import { useGeolocated } from "react-geolocated";
import { LatLngTuple } from "leaflet";

// import { IconContext } from "react-icons";
// import { MdGpsFixed } from 'react-icons/md';
import L from "leaflet";
import {
  FavoriteContext,
  FavoriteContextType,
} from "../context/FavoriteProvider";
import { useContext } from "react";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

// Classes used by Leaflet to position controls
// const POSITION_CLASSES = {
//     bottomleft: 'leaflet-bottom leaflet-left',
//     bottomright: 'leaflet-bottom leaflet-right',
//     topleft: 'leaflet-top leaflet-left',
//     topright: 'leaflet-top leaflet-right',
//   }

// function FlyToControl({ position }) {
//     const parentMap = useMap();
//     const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

//     const flyTo = () =>
//     {
//         const pos = [44.98, -93.17];
//         parentMap.flyTo(pos);
//     }

//     return (
//       <div className={positionClass}>
//         <div className="leaflet-bar leaflet-control">
//             <a href="#" onClick={flyTo} title="Fly To" role="button" aria-label="Fly To">
//                 <IconContext.Provider value={{ style: { fontSize: '18px', verticalAlign: 'text-top'} }}>
//                     <MdGpsFixed />
//                 </IconContext.Provider>
//             </a>
//         </div>
//       </div>
//     )
//   }

const Map = () => {
  const { favorites, vendorFavoriteItemNames } = useContext(
    FavoriteContext
  ) as FavoriteContextType;

  const center: LatLngTuple = [44.98106, -93.174351];
  const zoom = 20;
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const favoritesToMap = favorites.filter((favorite) =>
    Object.prototype.hasOwnProperty.call(favorite, "latitude")
  );

  // const favoritesToMap = [
  //   {
  //     name: "The Blue Barn",
  //     latitude: 44.9810468345,
  //     longitude: -93.1762321692,
  //   },
  // ];

  // const formatTimestamp = (s) => {
  //   return new Date(s * 1000).toISOString();
  // };

  const markerIconGreen = new L.Icon({
    iconRetinaUrl: markerIco2xGreenUrl,
    iconUrl: markerIconGreenUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [4, 41],
  });

  // const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  //   useGeolocated({
  //     positionOptions: {
  //       enableHighAccuracy: true,
  //     },
  //     watchPosition: true,
  //     userDecisionTimeout: 5000,
  //   });

  return (
    <main className="Map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer attribution={attribution} url={url} />
        <ScaleControl></ScaleControl>

        {/* {coords && (
          <>
            <Marker position={[coords.latitude, coords.longitude]}>
              <Popup>
                <p>latitude:{coords.latitude}</p>
                <p>longitude:{coords.longitude}</p>
                <p>altitude:{coords.altitude}</p>
                <p>heading:{coords.heading}</p>
                <p>speed:{coords.speed}</p>
                <p>accuracy:{coords.accuracy}</p>
                {coords.timestamp && <p>timestamp:{formatTimestamp(coords.timestamp)}</p>}
              </Popup>
            </Marker>

            <Circle center={[coords.latitude, coords.longitude]} radius={10} />
            <Circle
              center={[coords.latitude, coords.longitude]}
              radius={coords.accuracy}
            />
          </>
        )} */}

        {favoritesToMap.map((f, index) => (
          <Marker
            key={index}
            position={[f.latitude, f.longitude] as LatLngTuple}
            icon={markerIconGreen}
          >
            <Popup>
              <h4>{f.name}</h4>
              <ul>
                {vendorFavoriteItemNames(f.id).map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </Popup>
          </Marker>
        ))}

        {/* <FlyToControl position="topright" /> */}
      </MapContainer>
    </main>
  );
};
export default Map;
