import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LinearProgress, Typography } from "@mui/material";
import parse from 'html-react-parser';
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from '../components/CoinsTable';
import { CryptoState } from "../CryptoContext";
import './coinpage.css';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  const currentPrice = coin?.market_data.current_price[currency.toLowerCase()];
  const marketCapRank = coin.market_cap_rank;
  const marketcap = coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6);

  return (
    <div className='coinpage-container'>
      <div className='coinpage-sidebar'>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{
            marginBottom: 20
          }}
        />
        <Typography variant='h3' className="coinpage-heading">
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className='coinpage-description' >
          {(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className="coinpage-market-data">
          <span style={{ display: 'flex', }}>
            <Typography variant="h5" className="coinpage-heading">
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {marketCapRank !== undefined ? marketCapRank : 'N/A'}
            </Typography>
          </span>
          <span style={{ display: 'flex', }}>
            <Typography variant="h5" className="coinpage-heading">
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}{" "}
              {currentPrice !== undefined ? numberWithCommas(currentPrice) : 'N/A'}
            </Typography>
          </span>
          <span style={{ display: 'flex', }}>
            <Typography variant="h5" className="coinpage-heading">
              Market Cap: {" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}{" "}
              {marketcap !== undefined ? numberWithCommas(marketcap): 'N/A'}
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
