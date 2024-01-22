import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { Container, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'

const CoinsTable = () => {
    const [coins, setCoins] = useState([])

    const [loading, setLoading] = useState(false)

    const [search, setSearch] = useState()

    const { currency } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
    };

    console.log(coins);

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            type: 'dark'
        }
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant='h4'
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                </Typography>
                <TextField 
                label="Search for a Crypto Currency to grab.." 
                variant='outlined'
                style={{
                    marginBottom: 20,
                    width: "100%"
                }}
                onChange={(e)=>setSearch(e.target.value)}
                />

                
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable
