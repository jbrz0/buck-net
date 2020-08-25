const dotenv = require('dotenv')
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const moment = require('moment')
const CronJob = require('cron').CronJob;
const asyncRedis = require("async-redis")

const PORT = process.env.PORT || 5000
const REDIS_PORT = process.env.REDIS_PORT || 6379

// Dotenv Init
dotenv.config()

const client = asyncRedis.createClient(REDIS_PORT)

//! Run at 1AM and 1PM (UTC) to ensure updated daily SMA values
const job = new CronJob('00 01,13 * * *', function() {
  const url = 'https://www.alphavantage.co/'
  const params1 = 'query?function=SMA&symbol=BTCUSD&interval=daily&time_period='
  const interval1 = 15
  const interval2 = 50
  const interval3 = 200
  const params2 = '&series_type=close&apikey='
  const av = process.env.ALPHA_VANTAGE

  function returnLatestNum(res) {
    const data = res.data["Technical Analysis: SMA"]

    const latestDate = Object.keys(data)[0]
    const latestNum = parseFloat(data[latestDate].SMA).toFixed(2)
    return latestNum
  }

  // Get SMA for 15/50/200
  axios.get(`${url}${params1}${15}${params2}${av}`)
  .then((res) => {
    const latestNum = returnLatestNum(res)
    client.set("SMA15", latestNum)
  }).catch(error => console.log(error))

})
job.start()

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  console.log('pinged index')
  res.send('index page')
})

let SMA15 = ''
let all = {}

app.get('/sma', (req, res) => {

  async function getRedisValues() {
    SMA15 = await client.get("SMA15")

    all = {
      "SMA15": SMA15,
    }
    return all
  }
  getRedisValues().then(() => res.send(all))

})

app.listen(5000, () => {
  console.log(`App listening on ${PORT}`)
})
