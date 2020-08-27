import Binance from 'node-binance-api'

export const binance = new Binance().options({
  APIKEY: process.env.BINANCE,
  APISECRET: process.env.BINANCE_SECRET,
  useServerTime: true,
  recvWindow: 60000,
  verbose: true,
  log: log => {
    console.log(log)
  }
})
