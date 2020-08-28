import { useState, useEffect } from 'react'
import axios from 'axios'

function Overview() {

  const [buyers, setBuyers] = useState('')
  const [sellers, setSellers] = useState('')
  const [volume, setVolume] = useState('')
  const [outlook, setOutlook] = useState('')

  function buyOutlook(buy, vol) {
    // buyers / total volume = % of daily btc buyers
    const outlook = ((parseFloat(buy) / parseFloat(vol)) * 100).toString().substr(0, 2)
    return outlook
  }

  useEffect(() => {

    //? Get Latest BTC/USDT price from Binance
    axios.get(`http://localhost:5000/volume-buy-sell`)
    .then(function (response) {
      const buyVol = response.data.buyVol
      const sellVol = response.data.sellVol
      const allVol = response.data.allVol
      setBuyers(buyVol)
      setSellers(sellVol)
      setVolume(allVol)
      setOutlook(buyOutlook(buyVol, allVol))
    })
  }, [])


  return <div className="col-span-3 rounded-lg">
    <h2 className="tracking-widest text-center text-gray-50 opacity-75 font-bold text-xl">BTC/USDT</h2>
    <div className="relative"
      style={{minHeight: '550px'}}>
      <div className="absolute z-0 bg-no-repeat bg-center bg-contain mx-auto left-0 right-0"
      style={{backgroundImage: 'url(/main.svg)', width: '550px', height: '530px'}}
      ></div>

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



    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1 bg-yellow">test1</div>
      <div className="col-span-1 bg-yellow">test1</div>
      <div className="col-span-1 bg-yellow">test1</div>
    </div>
  </div>
}

export default Overview
