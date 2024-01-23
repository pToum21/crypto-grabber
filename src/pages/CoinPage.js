import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import './coinpage.css'

const CoinPage = () => {

  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))

    setCoin(data)
  }

  console.log(coin)

  useEffect(() => {
    fetchCoin();
  }, [])

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
        <Typography varient='h3' className="coinpage-heading">
          {coin?.name}
        </Typography>
        <Typography varient="subtitle1" className='coinpage-description' >
          {(coin?.description.en.split(". ")[0])}.
        </Typography>
      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage
