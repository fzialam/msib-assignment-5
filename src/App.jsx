import { useState, useEffect } from 'react'
import axios from 'axios'
import { DataCurrency } from './components/data-currency';
import './App.css'

function App() {
  const [tempData, setTempData] = useState([]);

  useEffect(() => {
    axios.get('https://api.currencyfreaks.com/v2.0/rates/latest',
      {
        params: {
          apikey: '88e2e09d868c4643b3dd2ab5a426765d',
          symbols: 'CAD,EUR,IDR,JPY,CHF,GBP',
          base: 'USD'
        }
      }
    )
      .then(response => {
        const dataRates = response.data.rates;

        const processData = Object.keys(dataRates).map(currency => {
          const dataRate = parseFloat(dataRates[currency]);
          return {
            currency,
            buy: (dataRate * 1.05).toFixed(5),
            exchangeRate: dataRate.toFixed(5),
            sell: (dataRate * 0.95).toFixed(5)
          };
        });
        setTempData(processData);
      })
      .catch(e => {
        console.error('Error fetch data', e);
      })
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {/* <DataCurrency Data={tempData} /> */}
          {
            // console.log('IKI NING TBODY', tempData)
            tempData.map((curr) => {
              const { currency, buy, exchangeRate, sell } = curr;
              return (
                <tr key={currency}>
                  <td>{currency}</td>
                  <td>{buy}</td>
                  <td>{exchangeRate}</td>
                  <td>{sell}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default App
