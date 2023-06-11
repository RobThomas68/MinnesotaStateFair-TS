interface Props {
  title: string;
}

const Header = (props: Props) => {
  const { title } = props;

  return (
    <header className="Header">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
