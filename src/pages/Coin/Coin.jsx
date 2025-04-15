import React, { useState, useEffect, useContext } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [error, setError] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-91Na3gF37jLkMimFB9B4FtwP",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      if (!response.ok)
        throw new Error("No se pudo obtener los datos de la moneda.");
      const data = await response.json();
      setCoinData(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los datos de la moneda.");
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-91Na3gF37jLkMimFB9B4FtwP",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency?.name || "usd"}&days=10&interval=daily`,
        options
      );
      if (!response.ok) throw new Error("Error al obtener los datos históricos.");
      const data = await response.json();
      setHistoryData(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los datos históricos.");
    }
  };

  useEffect(() => {
    if (currency && coinId) {
      fetchCoinData();
      fetchHistoricalData();
    }
  }, [currency, coinId]);

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  if (!coinData || !historyData) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img
          src={coinData?.image?.large || "/placeholder-image.png"}
          alt={coinData?.name || "Moneda desconocida"}
        />
        <p>
          <b>
            {coinData?.name} ({coinData?.symbol?.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historyData?.prices?.length ? historyData : null} />
      </div>

      <div className="coin-info">
<ul>
  <li>Rango en el mercado de criptomonedas</li>
  <li>{coinData.market_cap_rank}</li>
</ul>
<ul>
  <li>Precio actual</li>
  <li>{currency.symbol} 
  {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
</ul>
<ul>
  <li>Capitalización de mercado</li>
  <li>{currency.symbol} 
  {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
</ul>
<ul>
  <li>24 Hour high</li>
  <li>{currency.symbol} 
  {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
</ul>
<ul>
  <li>24 Hour low</li>
  <li>{currency.symbol} 
  {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
</ul>

</div>


    </div>


  );
};

export default Coin;

