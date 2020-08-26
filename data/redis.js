const dotenv = require('dotenv')
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const CronJob = require('cron').CronJob;
const asyncRedis = require('async-redis')
const Binance = require('node-binance-api')


// Config
dotenv.config()
const PORT = process.env.PORT || 5000
const REDIS_PORT = process.env.REDIS_PORT || 6379
const client = asyncRedis.createClient(REDIS_PORT)

// Binance Config
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

async function checkPrice() {
  let ticker = await binance.prices()
  console.info(`${ticker.BNBUSDT}`) // 21.67730000
}
checkPrice()

//! Run at 1AM and 1PM (UTC) to ensure updated daily SMA values
const job = new CronJob('00 01,13 * * *', function() {
  const url = 'https://www.alphavantage.co/'
  const params1 = 'query?function=SMA&symbol=BTCUSD&interval=daily&time_period='
  const params2 = '&series_type=close&apikey='
  const av = process.env.ALPHA_VANTAGE

  function returnLatestNum(res) {
    const data = res.data["Technical Analysis: SMA"]
    const latestDate = Object.keys(data)[0]
    const latestNum = parseFloat(data[latestDate].SMA).toFixed(2)
    return latestNum
  }

  // Get SMA for 15/50/200
  axios.get(`${url}${params1}${15}${params2}${av}`).then((res) => {client.set("SMA15", returnLatestNum(res))}).catch(err => console.log(err))
  axios.get(`${url}${params1}${50}${params2}${av}`).then((res) => {client.set("SMA50", returnLatestNum(res))}).catch(err => console.log(err))
  axios.get(`${url}${params1}${200}${params2}${av}`).then((res) => {client.set("SMA200", returnLatestNum(res))}).catch(err => console.log(err))

})
job.start()

const app = express()

app.use(cors())

let SMA15 = ''
let SMA50 = ''
let SMA200 = ''
let all = {}

app.get('/sma', (req, res) => {

  async function getRedisValues() {
    SMA15 = await client.get("SMA15")
    SMA50 = await client.get("SMA50")
    SMA200 = await client.get("SMA200")

    all = {
      "SMA15": SMA15,
      "SMA50": SMA50,
      "SMA200": SMA200,
    }
    return all
  }
  getRedisValues().then(() => res.send(all))

})

app.listen(5000, () => {
  console.log(`App listening on ${PORT}`)
})
