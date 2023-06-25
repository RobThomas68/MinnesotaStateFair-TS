import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";

interface Props {
  title: string;
  width: number;
}

const Header = (props: Props) => {
  const { title, width } = props;

  return (
    <header className="Header">
      <h1>{title}</h1>
      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </header>
  );
};

export default Header;
