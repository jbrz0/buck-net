module.exports = {

  devIndicators: {
    // remove lightning bolt icon
    autoPrerender: false,
  },

  // Re-map environment vars to work with next
  env: {
    BINANCE: process.env.BINANCE,
    BINANCE_SECRET: process.env.BINANCE_SECRET,
    ALPHA_VANTAGE: process.env.ALPHA_VANTAGE,
  }
}
