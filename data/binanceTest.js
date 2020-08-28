const Binance = require('node-binance-api')
// import axios from 'axios'

const binance = new Binance().options({
  APIKEY: process.env.BINANCE,
  APISECRET: process.env.BINANCE_SECRET,
  useServerTime: true,
  recvWindow: 60000,
  verbose: true,
  log: log => {
    console.log(log)
  }
})

// async function getPrice() {
//   let price = await binance.prices()

//   let bitcoin = parseFloat(price.BTCUSDT).toFixed(2)
//   let ethereum = parseFloat(price.ETHUSDT).toFixed(2)
//   let ripple = parseFloat(price.XRPUSDT).toFixed(2)
//   let chainlink = parseFloat(price.LINKUSDT).toFixed(2)
//   let litecoin = parseFloat(price.LTCUSDT).toFixed(2)
//   let cardano = parseFloat(price.ADAUSDT).toFixed(2)
//   let eos = parseFloat(price.EOSUSDT).toFixed(2)
//   let tezos = parseFloat(price.XTZUSDT).toFixed(2)
//   let stellar = parseFloat(price.XLMUSDT).toFixed(2)
//   let tron = parseFloat(price.TRXUSDT).toFixed(2)

//   return {
//     bitcoin,
//     ethereum,
//     ripple,
//     chainlink,
//     litecoin,
//     cardano,
//     eos,
//     tezos,
//     stellar,
//     tron,
//   }
// }
// // getPrice().then((price) => res.send(price))
// getPrice().then((price) => console.log(price))

// async function getPriceChange() {
//   let prev = await binance.prevDay()

//   const item = prev.filter(ticker => {
//     if (ticker.symbol === 'BTCUSDT') return true
//     else if (ticker.symbol === 'ETHUSDT') return true
//     else if (ticker.symbol === 'XRPUSDT') return true
//     else if (ticker.symbol === 'LINKUSDT') return true
//     else if (ticker.symbol === 'LTCUSDT') return true
//     else if (ticker.symbol === 'ADAUSDT') return true
//     else if (ticker.symbol === 'EOSUSDT') return true
//     else if (ticker.symbol === 'XTZUSDT') return true
//     else if (ticker.symbol === 'XLMUSDT') return true
//     else if (ticker.symbol === 'TRXUSDT') return true
//   })

//   return [...item]
// }
// // getPriceChange().then((change) => res.send(change))
// getPriceChange().then((price) => console.log(price))

// binance.candlesticks("BNBBTC", "5m", (error, ticks, symbol) => {
//   console.info("candlesticks()", ticks);
//   let last_tick = ticks[ticks.length - 1];
//   let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
//   console.info(symbol+" last close: "+close);
// }, {limit: 500, endTime: 1514764800000});

// async function getPriceChange() {

//   // let candle = binance.candlesticks("BNBBTC", "5m", (error, ticks, symbol) => {
//   //   console.info("candlesticks()", ticks);
//   //   let last_tick = ticks[ticks.length - 1];
//   //   let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
//   //   console.info(symbol+" last close: "+close);
//   // }, {limit: 500, endTime: 1514764800000});
//   let candle = '1'
//   await binance.candlesticks("BNBBTC", "5m", (error, ticks, symbol) => {
//     // console.info("candlesticks()", ticks);
//     let last_tick = ticks[ticks.length - 1];
//     let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
//     console.info(volume);
//     candle = volume
//     // return volume
//   }, {limit: 1});

//   return candle
// }
// // getPriceChange().then((change) => res.send(change))
// getPriceChange().then((price) => console.log(price))

// async function test() {


//   let vol = ''
//   let getData = () => binance.candlesticks("BNBBTC", "5m", (error, ticks, symbol) => {
//     // console.info("candlesticks()", ticks);
//     let last_tick = ticks[ticks.length - 1];
//     let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
//     // console.info(symbol+" last close: "+close);
//     vol = volume
//     // return volume
//   }, {limit: 1})

//   getData()

//   // console.log(vol)
//   return

//   // .then((data) => console.log(data))

// }

// test().then(async (data) => console.log(data))

// Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
//? Response
// [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored]
// [
//   1499040000000,      // [0] Open time
//   "0.01634790",       // [1] Open
//   "0.80000000",       // [2] High
//   "0.01575800",       // [3] Low
//   "0.01577100",       // [4] Close
//   "148976.11427815",  // [5] Volume
//   1499644799999,      // [6] Close time
//   "2434.19055334",    // [7] Quote asset volume
//   308,                // [8] Number of trades
//   "1756.87402397",    // [9] Taker buy base asset volume
//   "28.46694368",      // [10] Taker buy quote asset volume
//   "17928899.62484339" // [11] Ignore.
// ]
// Buy volume is 10
// Sell volume is 7 - 10

async function getCandle() {
  let candle = await binance.candlesticks("BTCUSDT", "1d")
  return candle
}
getCandle().then(data => {
  // console.log(data[data.length - 1])
  const buyVol = data[data.length - 1][10]
  const sellVol = parseFloat(data[data.length - 1][7] - buyVol).toString()
  console.log(buyVol, sellVol)
})


// setTimeout(() => console.log(test()), 2000)

// const BASE = 'https://api.binance.com'
// const FUTURES = 'https://fapi.binance.com'


// axios.get(`http://localhost:5000/price`)
//       .then(function (response) {
//         const fullPrice = response.data.toString()
//         setPrice(fullPrice.split('.')[0])
//         setPriceCent(fullPrice.split('.')[1])
//       })

// async function getCandle() {
//   let candle = await binance.candlesticks("BNBBTC", "5m", () => {
//     // [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored]
//   }, {limit: 1})
//   return candle
// }
// const candle = await getCandle().then(data => data)
// console.log(candle)
