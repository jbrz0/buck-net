const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()
// https://pro-api.coinmarketcap.com
// https://api.coinmarketcap.com/v1/ticker/
// https://_/v1/cryptocurrency/listings/latest
// const bUrl = 'https://api.coinmarketcap.com/v1/'

// const cmUrl = 'https://pro-api.coinmarketcap.com/v1/'
// // const params = 'blockchain/statistics/latest?symbol=BTC'
// const cmParams =  'cryptocurrency/listings/latest?limit=50'


// axios({
//   url: cmUrl + cmParams,
//   method: 'get',
//   headers: {
//     'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP,
//     'Accept': 'application/json'
//   }
// })
// .then(response => {
//   // Find btc from top 50 coins (no direct BTC call)
//   const arr = response.data.data
//   const btc = arr.filter(coin => coin.symbol === "BTC")[0]

//   const marketCap = btc.quote.USD.market_cap
//   const weekChange = btc.quote.USD.percent_change_7d
//   console.log(marketCap, weekChange)
// })
// .catch(err => {
//   console.log(err)
// })




const cmUrl = 'https://pro-api.coinmarketcap.com/v1/'
// const params = 'blockchain/statistics/latest?symbol=BTC'
const cmParams =  '/exchange/listings/historical'


axios({
  url: cmUrl + cmParams,
  method: 'get',
  headers: {
    'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP,
    'Accept': 'application/json'
  }
})
.then(response => {
  // Find btc from top 50 coins (no direct BTC call)
  const arr = response.data.data
  const bnc = arr.filter(exc => exc.name === "Binance")[0]

  // const marketCap = btc.quote.USD.market_cap
  // const weekChange = btc.quote.USD.percent_change_7d
  // console.log(marketCap, weekChange)
  console.log(bnc)
})
.catch(err => {
  console.log(err)
})
