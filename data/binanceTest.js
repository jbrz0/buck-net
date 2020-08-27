const Binance = require('node-binance-api')

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

async function getPriceChange() {

  // let candle = binance.candlesticks("BNBBTC", "5m", (error, ticks, symbol) => {
  //   console.info("candlesticks()", ticks);
  //   let last_tick = ticks[ticks.length - 1];
  //   let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
  //   console.info(symbol+" last close: "+close);
  // }, {limit: 500, endTime: 1514764800000});
  let candle = '1'
  await binance.candlesticks("BNBBTC", "5m", (error, ticks, symbol) => {
    // console.info("candlesticks()", ticks);
    let last_tick = ticks[ticks.length - 1];
    let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
    console.info(volume);
    candle = volume
    // return volume
  }, {limit: 1});

  return candle
}
// getPriceChange().then((change) => res.send(change))
getPriceChange().then((price) => console.log(price))
