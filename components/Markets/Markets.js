import moment from 'moment'
import axios from 'axios'
import { useState, useEffect } from 'react'
import useMedia from 'use-media'
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer} from 'recharts'
// import chartDemoData from './chartDemoData'

function Markets() {
  const today = moment().format('dddd MMM D, YYYY')
  const timestamp = moment().format('h:mm A')
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  const [priceColour, setPriceColour] = useState('#9292C1')

  const [ready, setReady] = useState(null)
  const [chartData, setChartData] = useState([])

    // City for time
    const [newYork, setNewYork] = useState('')
    const [london, setLondon] = useState('')
    const [tokyo, setTokyo] = useState('')

    // Media query hook
    const isLg = useMedia({maxWidth: '1599px'})
    const isMd = useMedia({maxWidth: '1279px'})

  useEffect(() => {

    //? Get hourly volume (for chart)
    axios.get(`${process.env.URL}/candles-hourly`)
      .then(response => {

        const fmtData = response.data.map(item => {
          return {'1H': parseFloat(item['1H'])}
        })

        setChartData(fmtData)

        const newPrice = parseFloat(response.data[response.data.length - 1]['1H'])
        const oldPrice = parseFloat(response.data[0]['1H'])

        if (newPrice > oldPrice) setPriceColour('#8AFF6C')
        else if (oldPrice > newPrice) setPriceColour('#F52C38')
      })

    const fmTime = (res) => {
      let str = res
      let t1 = str.slice(0, -1).split('T')
      let t2 = t1[1].slice(0, -1).split('+')
      return t2
    }
    // Get times
    axios.get(`https://worldtimeapi.org/api/timezone/America/New_York`)
    .then(response => {
      let time = fmTime(response.data.datetime)
      setNewYork(moment(time, "hh:mm:ss:SSS").format('hh:mm A'))
    })
    axios.get(`https://worldtimeapi.org/api/timezone/Europe/London`)
    .then(response => {
      let time = fmTime(response.data.datetime)
      setLondon(moment(time, "hh:mm:ss:SSS").format('hh:mm A'))
    })
    axios.get(`https://worldtimeapi.org/api/timezone/Asia/Tokyo`)
    .then(response => {
      let time = fmTime(response.data.datetime)
      setTokyo(moment(time, "hh:mm:ss:SSS").format('hh:mm A'))
    })

    setReady(true)

  }, [])

  function dW(isLg, isMd) {
    // Topdown, sm to lg screen
    if (isMd) return 235
    else if (isLg) return 188
    // XL
    else return 230
  }

  return ready && (<div className="w-full bg-gray-300 rounded-lg px-6 py-4 mb-4 shadow-xl">

      <LineChart
        width={dW(isLg, isMd)}
        height={85}
        data={chartData}
        >
        <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} />
        <Tooltip
          contentStyle={{background: 'black', border: 0, borderRadius: '1rem', fontSize: '0.8rem', color: 'white'}}
          labelStyle={{display: 'none'}}
          itemStyle={{color: '#CCD0DB'}}/>
        <Line type="monotone"
        dataKey="1H"
        stroke={priceColour}

        strokeWidth={3}
        dot={false}
        />
      </LineChart>

    <div className="text-white mt-6">{today}</div>
    <div className="text-white font-bold text-2xl">{timestamp}</div>
    {tz !== null && tz !== undefined && tz !== '' && <div className="text-white
      opacity-75 text-sm mb-6">
      {tz}
    </div>}

    <div className="text-white font-normal text-sm">
      <ul className="list-none list-inside">
        <li className="mb-2"><span className="text-teal font-bold">&#9737;</span> New York
          <span className="gr-blue float-right overflow-auto rounded relative text-center font-bold text-sm"
            style={{top: '-0.2rem', padding: '0.1rem 0.25rem', width: '5.2rem', textShadow: '0 0 8px rgba(0,0,0,0.5)'}}>{newYork}</span>
        </li>
        <li className="mb-2"><span className="text-pink font-bold">&#9737;</span> London
          <span className="gr-purple float-right overflow-auto rounded relative text-center font-bold text-sm"
            style={{top: '-0.2rem', padding: '0.1rem 0.25rem', width: '5.2rem', textShadow: '0 0 8px rgba(0,0,0,0.5)'}}>{london}</span>
        </li>
        <li className="mb-2"><span className="text-yellow font-bold">&#9737;</span> Tokyo
          <span className="gr-yellow float-right overflow-auto rounded relative text-center font-bold text-sm"
            style={{top: '-0.2rem', padding: '0.1rem 0.25rem', width: '5.2rem', textShadow: '0 0 8px rgba(0,0,0,0.5)'}}>{tokyo}</span>
        </li>
      </ul>
    </div>

  </div>)
}

export default Markets
