module.exports = {

  devIndicators: {
    // remove lightning bolt icon
    autoPrerender: false,
  },

  // Re-map environment vars to work with next
  env: {
    BINANCE: process.env.BINANCE,
    BINANCE_SECRET: process.env.BINANCE_SECRET,
    COINMARKETCAP: process.env.COINMARKETCAP,
    URL: process.env.URL,
  }
}
