import { useState, useEffect } from "react"
import axios from 'axios'

function CurrentPrice() {

  const [price, setPrice] = useState('')
  const [priceCent, setPriceCent] = useState('')
  const [priceChange, setPriceChange] = useState('')

  useEffect(() => {
    //? Get Latest BTC/USDT price from Binance
    axios.get(`http://localhost:5000/price`)
      .then(function (response) {
        const fullPrice = response.data.toString()
        setPrice(fullPrice.split('.')[0])
        setPriceCent(fullPrice.split('.')[1])
      })

    //? Get Previous 24h Price of BTC
    axios.get(`http://localhost:5000/price-change`)
      .then(response => setPriceChange(response.data))

  }, [])

  return <div className="w-full bg-gray-300 rounded-lg px-8 py-6 mb-4 shadow-xl">
    <h3 className="text-white text-md mb-2">Current Price</h3>
    <div className="text-3xl font-bold text-white">
      {price}
      <span className="text-gray-50">.{priceCent}</span>

      <div className=" ml-2 mr-1 arrow-up"></div>
      <span className="text-green text-sm font-normal">10%</span>
      {/* <div className="ml-2 arrow-down"></div> */}
      <div className="opacity-75 text-sm font-normal mb-2">
        Price Last 24H:&nbsp;
        <span className="font-bold">{priceChange}</span>
      </div>
    </div>
  </div>
}

export default CurrentPrice
