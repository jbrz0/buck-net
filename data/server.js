const dotenv = require('dotenv')
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const CronJob = require('cron').CronJob
const asyncRedis = require('async-redis')
const Binance = require('node-binance-api')

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
// const job = new CronJob('00 01,13 * * *', function() {
  const url = 'https://www.alphavantage.co/'
  const params1 = 'query?function=SMA&symbol=BTCUSD&interval=daily&time_period='
  const params2 = '&series_type=close&apikey='
  const av = process.env.ALPHA_VANTAGE

  function returnSMA(res, i) {
    const data = res.data["Technical Analysis: SMA"]
    const latestDate = Object.keys(data)[i]
    const latestNum = parseFloat(data[latestDate].SMA).toFixed(2)
    return latestNum
  }

  function repeatSMAVal(res, time) {
    for (let i = 0; i < 5; i++) {
      return client.set(`SMA${time}ChartItem${i + 1}`, returnSMA(res, i))
    }
  }

  // Get SMA for 15/50/200
  axios.get(`${url}${params1}${15}${params2}${av}`).then((res) => {
    client.set("SMA15", returnSMA(res, 0))
    repeatSMAVal(res, "15")
  }).catch(err => console.log(err))

  axios.get(`${url}${params1}${50}${params2}${av}`).then((res) => {
    client.set("SMA50", returnSMA(res, 0))
    repeatSMAVal(res, "50")
  }).catch(err => console.log(err))

  axios.get(`${url}${params1}${200}${params2}${av}`).then((res) => {
    client.set("SMA200", returnSMA(res, 0))
    repeatSMAVal(res, "200")
  }).catch(err => console.log(err))

  const params3 = 'query?function='
  const daily = 'DIGITAL_CURRENCY_DAILY'
  const weekly = 'DIGITAL_CURRENCY_WEEKLY'
  const monthly = 'DIGITAL_CURRENCY_MONTHLY'
  const params4 = '&symbol=BTC&market=USD&apikey='

  function returnVolD(res, i) {
    const data = res.data["Time Series (Digital Currency Daily)"]
    const latestDate = Object.keys(data)[i]
    const latestNum = parseFloat(data[latestDate]['5. volume']).toFixed(2)
    return latestNum
  }
  function returnVolW(res, i) {
    const data = res.data["Time Series (Digital Currency Weekly)"]
    const latestDate = Object.keys(data)[i]
    const latestNum = parseFloat(data[latestDate]['5. volume']).toFixed(2)
    return latestNum
  }
  function returnVolM(res, i) {
    const data = res.data["Time Series (Digital Currency Monthly)"]
    const latestDate = Object.keys(data)[i]
    const latestNum = parseFloat(data[latestDate]['5. volume']).toFixed(2)
    return latestNum
  }

  // Get Volume (day, week, month)
  // Because of API limitations, we wait 1 min to ping the server
  axios.get(`${url}${params3}${daily}${params4}${av}`).then((res) => {
    setTimeout(() => client.set("btcVolD", returnVolD(res, 0)), 65000)
  }).catch(err => console.log(err))

  axios.get(`${url}${params3}${weekly}${params4}${av}`).then((res) => {
    client.set("btcVolW", returnVolW(res, 0))
    setTimeout(() => client.set("btcVolD", returnVolW(res, 0)), 65000)
  }).catch(err => console.log(err))

  axios.get(`${url}${params3}${monthly}${params4}${av}`).then((res) => {
    setTimeout(() => client.set("btcVolD", returnVolM(res, 0)), 65000)
  }).catch(err => console.log(err))

// })
// job.start()

const app = express()

app.use(cors())

let SMA15 = ''
let SMA50 = ''
let SMA200 = ''
let SMA15ChartItem1 = ''
let SMA15ChartItem2 = ''
let SMA15ChartItem3 = ''
let SMA15ChartItem4 = ''
let SMA15ChartItem5 = ''
let SMA15ChartItem6 = ''
let SMA50ChartItem1 = ''
let SMA50ChartItem2 = ''
let SMA50ChartItem3 = ''
let SMA50ChartItem4 = ''
let SMA50ChartItem5 = ''
let SMA50ChartItem6 = ''
let SMA200ChartItem1 = ''
let SMA200ChartItem2 = ''
let SMA200ChartItem3 = ''
let SMA200ChartItem4 = ''
let SMA200ChartItem5 = ''
let SMA200ChartItem6 = ''
let all = {}

app.get('/sma', (req, res) => {

  async function getRedisValues() {
    SMA15 = await client.get("SMA15")
    SMA50 = await client.get("SMA50")
    SMA200 = await client.get("SMA200")
    SMA15ChartItem1 = await client.get("SMA15ChartItem1")
    SMA15ChartItem2 = await client.get("SMA15ChartItem2")
    SMA15ChartItem3 = await client.get("SMA15ChartItem3")
    SMA15ChartItem4 = await client.get("SMA15ChartItem4")
    SMA15ChartItem5 = await client.get("SMA15ChartItem5")
    SMA15ChartItem6 = await client.get("SMA15ChartItem6")
    SMA50ChartItem1 = await client.get("SMA50ChartItem1")
    SMA50ChartItem2 = await client.get("SMA50ChartItem2")
    SMA50ChartItem3 = await client.get("SMA50ChartItem3")
    SMA50ChartItem4 = await client.get("SMA50ChartItem4")
    SMA50ChartItem5 = await client.get("SMA50ChartItem5")
    SMA50ChartItem6 = await client.get("SMA50ChartItem6")
    SMA200ChartItem1 = await client.get("SMA200ChartItem1")
    SMA200ChartItem2 = await client.get("SMA200ChartItem2")
    SMA200ChartItem3 = await client.get("SMA200ChartItem3")
    SMA200ChartItem4 = await client.get("SMA200ChartItem4")
    SMA200ChartItem5 = await client.get("SMA200ChartItem5")
    SMA200ChartItem6 = await client.get("SMA200ChartItem6")

    all = {
      "SMA15": SMA15,
      "SMA50": SMA50,
      "SMA200": SMA200,
      "SMA15ChartItem1": SMA15ChartItem1,
      "SMA15ChartItem2": SMA15ChartItem2,
      "SMA15ChartItem3": SMA15ChartItem3,
      "SMA15ChartItem4": SMA15ChartItem4,
      "SMA15ChartItem5": SMA15ChartItem5,
      "SMA15ChartItem6": SMA15ChartItem6,
      "SMA50ChartItem1": SMA50ChartItem1,
      "SMA50ChartItem2": SMA50ChartItem2,
      "SMA50ChartItem3": SMA50ChartItem3,
      "SMA50ChartItem4": SMA50ChartItem4,
      "SMA50ChartItem5": SMA50ChartItem5,
      "SMA50ChartItem6": SMA50ChartItem6,
      "SMA200ChartItem1": SMA200ChartItem1,
      "SMA200ChartItem2": SMA200ChartItem2,
      "SMA200ChartItem3": SMA200ChartItem3,
      "SMA200ChartItem4": SMA200ChartItem4,
      "SMA200ChartItem5": SMA200ChartItem5,
      "SMA200ChartItem6": SMA200ChartItem6,
    }
    return all
  }
  getRedisValues().then(() => res.send(all))

})

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
    const fmtPrice = parseFloat(item[0].lastPrice).toFixed(2)
    return fmtPrice
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

    return {
      bitcoin,
      ethereum,
      ripple,
      chainlink,
      litecoin,
      cardano,
      eos,
      tezos,
      stellar,
      tron,
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

app.listen(5000, () => {
  console.log(`App listening on ${PORT}`)
})
