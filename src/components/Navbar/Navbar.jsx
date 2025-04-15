import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/Cripto.png";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const scrollToFooter = () => {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
};

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$", rate: 1 });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€", rate: 0.85 });
        break;
      }
      case "ars": {
        setCurrency({ name: "ars", symbol: "AR$", rate: 200 });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$", rate: 1 });
        break;
      }
    }
  };

  const scrollToFooter = () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="navbar">
      <div className="logos">
        <img src={logo} alt="logo" className="logo" />
        <Link to={"/"}>
          <h1>CriptoWave</h1>
        </Link>
      </div>

      <ul>
        <Link to={"/"}>
          <li>Inicio</li>
        </Link>
        <li onClick={scrollToFooter} style={{ cursor: "pointer" }}>
          Contacto
        </li>
      </ul>

      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="ars">ARS</option>
        </select>
        <a 
          href="https://lapizzafria.github.io/Portafolio-JS-1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="portfolio-button"> Portfolio <FaArrowUpRightFromSquare />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
