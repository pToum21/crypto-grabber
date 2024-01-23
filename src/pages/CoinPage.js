import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'; 
import { CryptoState } from '../CryptoContext'
import {SingleCoin} from '../config/api'
import axios from 'axios';
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
    <div className='container'>
      
    </div>
  )
}

export default CoinPage
