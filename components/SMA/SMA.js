import { useState, useEffect } from 'react'
import axios from 'axios'

function SMA() {

  const [fifteen, setFifteen] = useState('')
  const [fifty, setFifty] = useState('')
  const [twoH, setTwoH] = useState('')

  useEffect(() => {
    //? Get SMA Data from Alpha Vantage
    //! Test communication between redis server
    axios.get(`http://localhost:5000/sma`)
    .then(function (response) {

      setFifteen(response.data.SMA15)
      setFifty(response.data.SMA50)
      setTwoH(response.data.SMA200)
    })

  }, [])

  return <div className="w-full bg-gray-300 rounded-lg px-8 py-6 mb-4 shadow-xl">
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-1 text-white text-sm">15 EMA</div>
      <div className="col-span-1 text-gray-200 font-bold text-sm">{fifteen}</div>
      <div className="col-span-1 text-sm text-red">CHART</div>
    </div>
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-1 text-white text-sm">50 EMA</div>
      <div className="col-span-1 text-gray-200 font-bold text-sm">{fifty}</div>
      <div className="col-span-1 text-sm text-red">CHART</div>
    </div>
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-1 text-white text-sm">200 EMA</div>
      <div className="col-span-1 text-gray-200 font-bold text-sm">{twoH}</div>
      <div className="col-span-1 text-sm text-red">CHART</div>
    </div>
  </div>
}

export default SMA
