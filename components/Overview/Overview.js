import { useState, useEffect } from 'react'
import axios from 'axios'
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

  useEffect(() => {

    //? Get Latest BTC/USDT price from Binance
    axios.get(`http://localhost:5000/volume-buy-sell`)
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
    axios.get(`http://localhost:5000/candles-eth`)
    .then(response => {
      const fmtData = response.data.map(item => {
        return {'1H': parseFloat(item['1H'])}
      })
      setEth(fmtData)
      setEthPrice(fmtData[fmtData.length - 1]['1H'])
    })
    axios.get(`http://localhost:5000/candles-xrp`)
    .then(response => {
      const fmtData = response.data.map(item => {
        return {'1H': parseFloat(item['1H'])}
      })
      setXrp(fmtData)
      setXrpPrice(fmtData[fmtData.length - 1]['1H'])
    })
    axios.get(`http://localhost:5000/candles-ltc`)
    .then(response => {
      const fmtData = response.data.map(item => {
        return {'1H': parseFloat(item['1H'])}
      })
      setLtc(fmtData)
      setLtcPrice(fmtData[fmtData.length - 1]['1H'])
    })

    axios.get(`http://localhost:5000/cmc`)
    .then(response => {
      setMarketCap(response.data.marketCap)
      setWeekChange(parseFloat(response.data.weekChange).toFixed(2))
    })

    setReady(true)
  }, [])


  return ready && <div className="col-span-3 rounded-lg">
    <h2 className="tracking-widest text-center text-gray-50 opacity-75 font-bold text-xl">BTC/USDT</h2>
    <div className="relative"
      style={{minHeight: '550px'}}>
      <div className="absolute z-0 bg-no-repeat bg-center bg-contain mx-auto left-0 right-0"
      style={{backgroundImage: 'url(/main.svg)', width: '550px', height: '530px'}}
      ></div>

      <div className="absolute top-0 left-0 w-24"
        style={{marginLeft: '5.75rem', marginTop: '13.5rem', fontSize: '0.75rem'}}>
        <div className="text-white text-light text-right">Long</div>
        <div className="font-bold text-white text-right truncate">{buyers && parseInt(buyers)}</div>
      </div>

      <div className="absolute top-0 right-0 w-24"
        style={{marginRight: '5.75rem', marginTop: '13.5rem', fontSize: '0.75rem'}}>
        <div className="text-white text-light text-left">Short</div>
        <div className="font-bold text-white text-left truncate">{sellers && parseInt(sellers)}</div>
      </div>

      <div className="absolute top-0 right-0 w-16"
        style={{marginRight: '16.95rem', marginTop: '5.52rem'}}>
        <div className="font-bold text-light text-gray-200 uppercase text-center"
          style={{fontSize: '0.66rem'}}>W CHG %</div>
        <div className="font-bold text-white text-lg text-center truncate leading-none">{weekChange}</div>
      </div>

      <div className="absolute top-0 right-0 w-16"
        style={{marginRight: '14.9rem', marginTop: '9.73rem'}}>
        <div className="font-bold text-light text-gray-200 uppercase text-center"
          style={{fontSize: '0.675rem'}}>SELL %</div>
        <div className="font-bold text-white text-lg text-center truncate leading-none">{sOutlook}</div>
      </div>

      <div className="absolute left-0 right-0 mx-auto bottom-0 mb-8 w-56"
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


    <div className="grid grid-cols-3 gap-6 mt-6">
      <MiniChart width={275} height={40} data={eth} ticker="ETH" name="Ethereum" price={ethPrice} />
      <MiniChart width={275} height={40} data={xrp} ticker="XRP" name="Ripple" price={xrpPrice} />
      <MiniChart width={275} height={40} data={ltc} ticker="LTC" name="Litecoin" price={ltcPrice} />
    </div>
  </div>
}

export default Overview
