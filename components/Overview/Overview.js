import { useState, useEffect } from 'react'
import axios from 'axios'
import useMedia from 'use-media'
import MiniChart from './MiniChart'

function Overview() {

  const [buyers, setBuyers] = useState('')
  const [sellers, setSellers] = useState('')
  const [volume, setVolume] = useState('')
  const [outlook, setOutlook] = useState('')
  const [sOutlook, setSOutlook] = useState('')
  const [ready, setReady] = useState(null)

  // Charts data
  const [eth, setEth] = useState([])
  const [xrp, setXrp] = useState([])
  const [ltc, setLtc] = useState([])

  // Price data
  const [ethPrice, setEthPrice] = useState('')
  const [xrpPrice, setXrpPrice] = useState('')
  const [ltcPrice, setLtcPrice] = useState('')

  // CMC Data
  const [marketCap, setMarketCap] = useState('')
  const [weekChange, setWeekChange] = useState('')

  function buyOutlook(buy, vol) {
    // buyers / total volume = % of daily btc buyers
    const outlook = ((parseFloat(buy) / parseFloat(vol)) * 100).toString().substr(0, 2)
    return outlook
  }
  function sellOutlook(sell, vol) {
    const outlook = ((parseFloat(sell) / parseFloat(vol)) * 100).toString().substr(0, 2)
    return outlook
  }

  // Media query hook
  const isLg = useMedia({maxWidth: '1599px'})
  const isMd = useMedia({maxWidth: '1279px'})
  const isSm = useMedia({maxWidth: '639px'})

  useEffect(() => {

    //? Get Latest BTC/USDT price from Binance
    axios.get(`${process.env.URL}/volume-buy-sell`)
    .then(function (response) {
      const buyVol = response.data.buyVol
      const sellVol = response.data.sellVol
      const allVol = parseFloat(buyVol) + parseFloat(sellVol)
      setBuyers(buyVol)
      setSellers(sellVol)
      setVolume(allVol)
      setOutlook(buyOutlook(buyVol, allVol))
      setSOutlook(sellOutlook(sellVol, allVol))
    })

    //? Get price data for charts
    axios.get(`${process.env.URL}/candles-eth`)
    .then(response => {
      const fmtData = response.data.map(item => {
        return {'1H': parseFloat(item['1H'])}
      })
      setEth(fmtData)
      setEthPrice(fmtData[fmtData.length - 1]['1H'])
    })
    axios.get(`${process.env.URL}/candles-xrp`)
    .then(response => {
      const fmtData = response.data.map(item => {
        return {'1H': parseFloat(item['1H'])}
      })
      setXrp(fmtData)
      setXrpPrice(fmtData[fmtData.length - 1]['1H'])
    })
    axios.get(`${process.env.URL}/candles-ltc`)
    .then(response => {
      const fmtData = response.data.map(item => {
        return {'1H': parseFloat(item['1H'])}
      })
      setLtc(fmtData)
      setLtcPrice(fmtData[fmtData.length - 1]['1H'])
    })

    axios.get(`${process.env.URL}/cmc`)
    .then(response => {
      setMarketCap(response.data.marketCap)
      setWeekChange(parseFloat(response.data.weekChange).toFixed(2))
    })

    setReady(true)

  }, [])

  function dW(isLg, isMd) {
    // Topdown, sm to lg screen
    if (isSm) return 240
    if (isMd) return 180
    else if (isLg) return 230
    // XL
    else return 275
  }

  return ready && <div className="overview order-1 col-span-6 xl:order-2 xl:col-span-3 rounded-lg">

    <h2 className="tracking-widest text-center text-white sm:text-gray-50 opacity-75 font-bold text-2xl sm:text-xl relative z-10">BTC/USDT</h2>
    <div className="relative hidden sm:block"
      style={{minHeight: '550px'}}>
      <div className="absolute z-0 bg-no-repeat bg-center bg-contain mx-auto left-0 right-0"
      style={{backgroundImage: 'url(/main.svg)', width: '550px', height: '530px'}}
      ></div>

      <div className="absolute right-0 w-24 o-long">
        <div className="text-white text-light text-right">Long</div>
        <div className="font-bold text-white text-right truncate">{buyers && parseInt(buyers)}</div>
      </div>

      <div className="absolute left-0 w-24 o-short">
        <div className="text-white text-light text-left">Short</div>
        <div className="font-bold text-white text-left truncate">{sellers && parseInt(sellers)}</div>
      </div>

      <div className="absolute top-0 mx-auto left-0 w-16 o-w-chg">
        <div className="font-bold text-light text-gray-200 uppercase text-center"
          style={{fontSize: '0.66rem'}}>W CHG %</div>
        <div className="font-bold text-white text-lg text-center truncate leading-none">{weekChange}</div>
      </div>

      <div className="absolute top-0 mx-auto left-0 w-16 o-sell">
        <div className="font-bold text-light text-gray-200 uppercase text-center"
          style={{fontSize: '0.675rem'}}>SELL %</div>
        <div className="font-bold text-white text-lg text-center truncate leading-none">{sOutlook}</div>
      </div>

      <div className="absolute left-0 right-0 mx-auto bottom-0 mb-8 w-56 o-mkt-cap"
        style={{fontSize: '0.75rem'}}>
        <div className="text-white text-light text-center">Market Cap</div>
        <div className="font-bold text-white text-center truncate">{marketCap && parseFloat(marketCap).toFixed(2)} (USD)</div>
      </div>

      {/* Outlook Text Box */}
      <div className="absolute left-0 right-0 mx-auto top-0"
        style={{width: '10rem', marginTop: '12rem'}}>

        <div className="text-gray-200 font-bold text-center uppercase text-uppercase relative">Buy Outlook</div>
        <div className="text-white font-bold text-sm text-center text-center">
          <span className="text-6xl leading-none">{outlook}</span>
          <span className="text-lg text-gray-100 absolute top-0 mt-8">%</span>
        </div>
      </div>
    </div>

    {/* Mobile view */}
    <div className="relative z-10 mt-8 sm:hidden">

      {/* Buy Outlook */}
      <div className="text-gray-200 font-bold uppercase text-uppercase mb-1">Buy Outlook</div>
      <div className="text-white font-bold text-sm">
        <span className="text-4xl leading-none">{outlook}</span>
        <span className="text-md text-gray-100 absolute top-0 mt-8">%</span>
      </div>

      {/* Sell Outlook */}
      <div className="border-b solid border-gray-200 w-full opacity-50 my-3"></div>
      <div className="font-bold text-light text-gray-200 uppercase mb-1">SELL %</div>
      <div className="text-white text-md truncate leading-none">{sOutlook}</div>

      {/* Week Change */}
      <div className="border-b solid border-gray-200 w-full opacity-50 my-3"></div>
      <div className="font-bold text-light text-gray-200 uppercase mb-1">W CHG %</div>
      <div className="text-white text-md truncate leading-none">{weekchange!== undefined && weekChange === null ? '🕝' : weekchange}</div>

      {/* Long */}
      <div className="border-b solid border-gray-200 w-full opacity-50 my-3"></div>
      <div className="font-bold text-light text-gray-200 uppercase mb-1">Long</div>
      <div className="text-white text-md truncate leading-none">{buyers && parseInt(buyers)}</div>

      {/* Short */}
      <div className="border-b solid border-gray-200 w-full opacity-50 my-3"></div>
      <div className="font-bold text-light text-gray-200 uppercase mb-1">Short</div>
      <div className="text-white text-md truncate leading-none">{sellers && parseInt(sellers)}}</div>

      {/* Market Cap */}
      <div className="border-b solid border-gray-200 w-full opacity-50 my-3"></div>
      <div className="font-bold text-light text-gray-200 uppercase mb-1">Market Cap</div>
      <div className="text-white text-md truncate leading-none">{marketCap && parseFloat(marketCap).toFixed(2)} (USD)</div>

      <div className="border-b solid border-gray-200 w-full opacity-50 mt-3 mb-8"></div>

    </div>


    <div className="grid grid-cols-3 gap-6 mt-6">
      <MiniChart width={dW(isLg, isMd, isSm)} height={40} data={eth} ticker="ETH" name="Ethereum" price={ethPrice} />
      <MiniChart width={dW(isLg, isMd, isSm)} height={40} data={xrp} ticker="XRP" name="Ripple" price={xrpPrice} />
      <MiniChart width={dW(isLg, isMd, isSm)} height={40} data={ltc} ticker="LTC" name="Litecoin" price={ltcPrice} />
    </div>
  </div>
}

export default Overview
