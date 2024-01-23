import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { HistoricalChart } from '../config/api'
import { ThemeProvider, createTheme } from '@mui/material'
import './coininfo.css'

function CoinInfo({coin}) {

const [historicData, setHistoricData] = useState()
const [days, setDays] = useState(1)

const { currency } = CryptoState()

const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))

    setHistoricData(data.prices);
}

useEffect(() => {
    fetchHistoricData()
}, [currency, days])

const darkTheme = createTheme({
    pallette: {
        main: "#fff",
    },
    type: "dark"
})

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className='coin-info-container'>
            {/* chart */}
            
        </div>
      </ThemeProvider>
    </div>
  )
}

export default CoinInfo
