module.exports = {

  devIndicators: {
    // remove lightning bolt icon
    autoPrerender: false,
  },

  // Re-map environment vars to work with next
  env: {
    BINANCE_API: process.env.BINANCE_API,
  }
}
