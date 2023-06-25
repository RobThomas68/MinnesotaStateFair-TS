import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";
import useWindowSize from "../hooks/useWindowSize";

const Layout = () => {
  const { width } = useWindowSize();
  return (
    <div className="App">
      <Header title="React TS MSF" width={width} />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
