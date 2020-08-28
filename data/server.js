const dotenv = require('dotenv')
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const CronJob = require('cron').CronJob
const asyncRedis = require('async-redis')
const Binance = require('node-binance-api')
const { fn } = require('moment')

// Config
dotenv.config()
const PORT = process.env.PORT || 5000
const REDIS_PORT = process.env.REDIS_PORT || 6379
const client = asyncRedis.createClient(REDIS_PORT)

// Binance
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

//! Run at 1AM and 1PM (UTC) to ensure updated daily SMA values
const job = new CronJob('00 01,13 * * *', function() {

  // Get marketCap & Week Change %
  function cmcCall() {
    const cmUrl = 'https://pro-api.coinmarketcap.com/v1/'
    // const params = 'blockchain/statistics/latest?symbol=BTC'
    const cmParams =  'cryptocurrency/listings/latest?limit=50'

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
      const btc = arr.filter(coin => coin.symbol === "BTC")[0]

      const marketCap = btc.quote.USD.market_cap
      const weekChange = btc.quote.USD.percent_change_7d
      client.set("marketCap", marketCap)
      client.set("weekChange", weekChange)
    })
    .catch(err => console.log(err))
  }
  cmcCall()

})
job.start()

const app = express()

app.use(cors())

let all = {}

app.get('/price', (req, res) => {

  async function getPrice() {
    let price = await binance.prices()
    let btc = parseFloat(price.BTCUSDT).toFixed(2)
    return btc
  }
  getPrice().then((price) => res.send(price))
  // getPrice().then((price) => console.log(price))
})

app.get('/price-change', (req, res) => {

  async function getPriceChange() {
    let prev = await binance.prevDay()

    const item = prev.filter(ticker => {
      if (ticker.symbol === 'BTCUSDT') return true
    })
    const prevPrice = parseFloat(item[0].prevClosePrice).toFixed(2)
    const changePercent = parseFloat(item[0].priceChangePercent).toFixed(2)

    return {
      prevPrice,
      changePercent
    }
  }
  getPriceChange().then((change) => res.send(change))
  // getPriceChange().then((change) => console.log(change))
})

app.get('/cryptosphere-prices', (req, res) => {

  async function getPrice() {
    let price = await binance.prices()

    let bitcoin = price.BTCUSDT
    let ethereum = price.ETHUSDT
    let ripple = price.XRPUSDT
    let chainlink = price.LINKUSDT
    let litecoin = price.LTCUSDT
    let cardano = price.ADAUSDT
    let eos = price.EOSUSDT
    let tezos = price.XTZUSDT
    let stellar = price.XLMUSDT
    let tron = price.TRXUSDT

    return { bitcoin, ethereum, ripple, chainlink,
      litecoin, cardano, eos, tezos, stellar, tron,
    }
  }
  getPrice().then((price) => res.send(price))
  // getPrice().then((price) => console.log(price))
})

app.get('/cryptosphere-change', (req, res) => {
  async function getPriceChange() {
    let prev = await binance.prevDay()

    const item = prev.filter(ticker => {
      if (ticker.symbol === 'BTCUSDT') return true
      else if (ticker.symbol === 'ETHUSDT') return true
      else if (ticker.symbol === 'XRPUSDT') return true
      else if (ticker.symbol === 'LINKUSDT') return true
      else if (ticker.symbol === 'LTCUSDT') return true
      else if (ticker.symbol === 'ADAUSDT') return true
      else if (ticker.symbol === 'EOSUSDT') return true
      else if (ticker.symbol === 'XTZUSDT') return true
      else if (ticker.symbol === 'XLMUSDT') return true
      else if (ticker.symbol === 'TRXUSDT') return true
    })

    return [...item]
  }
  getPriceChange().then((change) => res.send(change))
  // getPriceChange().then((change) => console.log(change))
})

let btcVolD = ''
let btcVolW = ''
let btcVolM = ''

app.get('/volume', (req, res) => {
  async function getRedisValues() {
    btcVolD = await client.get("btcVolD")
    btcVolW = await client.get("btcVolW")
    btcVolM = await client.get("btcVolM")

    all = {
      "btcVolD": btcVolD,
      "btcVolW": btcVolW,
      "btcVolM": btcVolM,
    }
    return all
  }
  getRedisValues().then(() => res.send(all))
})

// Get Daily Buy/Sell Volume
// Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
// [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored]
// Buy volume is [10], Sell volume is [7] - [10]
async function getCandle(t) {
  let candle = await binance.candlesticks("BTCUSDT", t)
  return candle
}
app.get('/volume-buy-sell', (req, res) => {
  getCandle('1d').then(data => {
    const buyVol = data[data.length - 1][10]
    const sellVol = parseFloat(data[data.length - 1][7] - buyVol).toString()
    const allVol = data[data.length - 1][5]
    res.send({buyVol, sellVol, allVol})
  })
})
app.get('/volume-buy-sell-w', (req, res) => {
  getCandle('1w').then(data => {
    const allVol = data[data.length - 1][5]
    res.send({allVol})
  })
})
app.get('/volume-buy-sell-m', (req, res) => {
  getCandle('1M').then(data => {
    const allVol = data[data.length - 1][5]
    res.send({allVol})
  })
})

app.get('/candles-hourly', (req, res) => {
  getCandle('1h').then(data => {
    const l = (i) => data[data.length - i][4]
    res.send([{'1H': l(1)},{'1H': l(2)},{'1H': l(3)},
      {'1H': l(4)},{'1H': l(5)},{'1H': l(6)},
    ])
  })
})
app.get('/candles-daily', (req, res) => {
  getCandle('1d').then(data => {
    const l = (i) => data[data.length - i][4]
    res.send([{'1D': l(1)},{'1D': l(2)},{'1D': l(3)},
      {'1D': l(4)},{'1D': l(5)},{'1D': l(6)},
    ])
  })
})
app.get('/candles-weekly', (req, res) => {
  getCandle('1w').then(data => {
    const l = (i) => data[data.length - i][4]
    res.send([{'1W': l(1)},{'1W': l(2)},{'1W': l(3)},
      {'1W': l(4)},{'1W': l(5)},{'1W': l(6)},
    ])
  })
})
app.get('/candles-monthly', (req, res) => {
  getCandle('1M').then(data => {
    const l = (i) => data[data.length - i][4]
    res.send([{'1M': l(1)},{'1M': l(2)},{'1M': l(3)},
      {'1M': l(4)},{'1M': l(5)},{'1M': l(6)},
    ])
  })
})

let marketCap = ''
let weekChange = ''

app.get('/cmc', (req, res) => {
  async function getRedisValues() {
    marketCap = await client.get("marketCap")
    weekChange = await client.get("weekChange")

    all = {
      "marketCap": marketCap,
      "weekChange": weekChange,
    }
    return all
  }
  getRedisValues().then(() => res.send(all))
})

app.listen(5000, () => {
  console.log(`App listening on ${PORT}`)
})
