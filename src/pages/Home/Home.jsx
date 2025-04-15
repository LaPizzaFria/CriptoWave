import React, { useContext, useState, useEffect } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom"

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === ""){
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K";
    }
    return num.toLocaleString();
  };

  useEffect(() => {
    if (allCoin && allCoin.length > 0) {
      setDisplayCoin(allCoin);
    }
  }, [allCoin]);

  return (
    <div>
      <div className="home">
        <div className="hero">
          <h2>
            Crypto Market
          </h2>
          <p>
          Explora la colección de criptomonedas más grande y diversa del mundo.
          Manténgase actualizado con datos, gráficos y tendencias en tiempo real.
          </p>
          <form onSubmit={searchHandler}>
            <input
              onChange={inputHandler}
              type="text"
              list="coinlist"
              value={input}
              placeholder="Encuentra Tu Crypto..."
              required
            />

            <datalist id="coinlist">
              {allCoin.map((item, index)=> (<option key={index} value={item.name}/>))}
            </datalist>


            <button type="submit">Buscar</button>
          </form>
        </div>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Monedas</p>
          <p>Precios</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin &&
          displayCoin.slice(0, 10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt={item.name} />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              
              <p>
                <span className="coin-symbol">{currency.symbol}</span>
                {formatNumber(item.current_price)}
              </p>
              
              <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              
              <p className="market-cap">
                {currency.symbol} {formatNumber(item.market_cap)}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
