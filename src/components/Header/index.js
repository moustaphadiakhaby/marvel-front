import "./Header.css";
import logo from "../../assets/img/m-logo.png";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import { Link } from "react-router-dom";

const Header = () => {
  const { search, setSearch } = useContext(ThemeContext);

  return (
    <div className="Header">
      <div className="header-container">
        <div className="header-top">
          <div className="logo">
            <img src={logo} alt="marvel's logo" />
          </div>

          <input
            className="search-box"
            type="text"
            value={search}
            placeholder="miles morales"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="header-bot">
          <div className="links">
            <Link
              className="link"
              to="/comics"
              onClick={() => {
                setSearch("");
              }}
            >
              COMICS
            </Link>
            <Link
              className="link"
              to="/characters"
              onClick={() => {
                setSearch("");
              }}
            >
              CHARACTERS
            </Link>
            <Link
              className="link"
              to="/favorites"
              onClick={() => {
                setSearch("");
              }}
            >
              FAVORITES
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
