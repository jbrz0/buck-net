import { useState, useEffect } from "react"
import axios from 'axios'

function CurrentPrice() {

  const [price, setPrice] = useState('')
  const [priceCent, setPriceCent] = useState('')

  const [prevPrice, setPrevPrice] = useState('')
  const [changePercent, setChangePercent] = useState('')


  function upOrDown(el) {
    let string = ''
    if (el === 'arrow' && prevPrice > price) return 'ml-2 mr-1 arrow-down'
    else if (el === 'arrow' && price > prevPrice) return 'ml-2 mr-1 arrow-up'
    else if (el === 'text' && prevPrice > price) return 'text-red text-sm font-normal'
    else if (el === 'text' && price > prevPrice) return 'text-green text-sm font-normal'
    else return ''
  }

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
      .then(response => {
        setPrevPrice(response.data.prevPrice)
        setChangePercent(response.data.changePercent)
      })

  }, [])

  return <div className="w-full bg-gray-300 rounded-lg px-8 py-6 mb-4 shadow-xl">
    <h3 className="text-white text-md mb-2">Current Price</h3>
    <div className="text-xl xxl:text-3xl font-bold text-white">
      {price}
      <span className="text-gray-50">.{priceCent}</span>

      <div className={upOrDown('arrow')}></div>
      <span className={upOrDown('text')}>{changePercent}%</span>
      {/* <div className="ml-2 arrow-down"></div> */}
      <div className="opacity-75 text-sm font-normal mb-2">
        Price Last 24H:&nbsp;
        <span className="font-bold">{prevPrice}</span>
      </div>
    </div>
  </div>
}

export default CurrentPrice
