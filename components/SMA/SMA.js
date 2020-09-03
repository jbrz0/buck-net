import { useState, useEffect } from 'react'
import axios from 'axios'
import MiniChart from './MiniChart'

function SMA() {

  // Chart values
  const [daily, setDaily] = useState('')
  const [weekly, setWeekly] = useState('')
  const [monthly, setMonthly] = useState('')

  // Prices
  const [dailyPrice, setDailyPrice] = useState('')
  const [weeklyPrice, setWeeklyPrice] = useState('')
  const [monthlyPrice, setMonthlyPrice] = useState('')

  const [ready, setReady] = useState(false)

  useEffect(() => {

    //? Get chart values
    axios.get(`${process.env.URL}/candles-daily`)
    .then(response => {
      const fmtData = response.data.map(item => {
        return {'1D': parseFloat(item['1D'])}
      })
      setDaily(fmtData)
      setDailyPrice(fmtData[fmtData.length - 1]['1D'])
    })
    axios.get(`${process.env.URL}/candles-weekly`)
    .then(response => {
      const fmtData = response.data.map(item => {
        return {'1W': parseFloat(item['1W'])}
      })
      setWeekly(fmtData)
      setWeeklyPrice(fmtData[fmtData.length - 1]['1W'])
    })
    axios.get(`${process.env.URL}/candles-monthly`)
    .then(response => {
      const fmtData = response.data.map(item => {
        return {'1M': parseFloat(item['1M'])}
      })
      setMonthly(fmtData)
      setMonthlyPrice(fmtData[fmtData.length - 1]['1M'])
    })

    setReady(true)

  }, [])

  return ready && <div className="w-full bg-gray-300 rounded-lg px-8 py-6 mb-4 shadow-xl">
    <div className="grid grid-cols-3 gap-2 mb-2">
      <div className="col-span-1 text-white text-sm">Hourly</div>
      <div className="hidden xxl:block xxl:col-span-1 text-gray-200 font-bold text-sm">{dailyPrice}</div>
      <div className="col-span-2 flex justify-end xxl:flex-none xxl:col-span-1 text-sm text-red">
      <MiniChart stroke={'#E323FF'} width={70} height={20} data={daily} dataKey="1D" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 mb-2">
      <div className="col-span-1 text-white text-sm">Weekly</div>
      <div className="hidden xxl:block xxl:col-span-1 text-gray-200 font-bold text-sm">{weeklyPrice}</div>
      <div className="col-span-2 flex justify-end xxl:flex-none xxl:col-span-1 text-sm text-red">
      <MiniChart stroke={'#8AFF6C'} width={70} height={20} data={weekly} dataKey="1W" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 mb-2">
      <div className="col-span-1 text-white text-sm">Monthly</div>
      <div className="hidden xxl:block xxl:col-span-1 text-gray-200 font-bold text-sm">{monthlyPrice}</div>
      <div className="col-span-2 flex justify-end xxl:flex-none xxl:col-span-1 text-sm text-red">
      <MiniChart stroke={'#FFB524'} width={70} height={20} data={monthly} dataKey="1M" />
      </div>
    </div>
  </div>
}

export default SMA
