import moment from 'moment'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer} from 'recharts'
// import chartDemoData from './chartDemoData'

function Markets() {
  const today = moment().format('dddd MMM D, YYYY')
  const timestamp = moment().format('h:MM A')
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  const [priceColour, setPriceColour] = useState('#9292C1')

  const [ready, setReady] = useState(null)
  const [chartData, setChartData] = useState([])

  useEffect(() => {

    //? Get hourly volume (for chart)
    axios.get(`http://localhost:5000/candles-hourly`)
      .then(response => {

        const fmtData = response.data.map(item => {
          // return parseFloat(item)
          return {'1H': parseFloat(item['1H'])}
        })

        setChartData(fmtData)
        console.log(fmtData)

        const newPrice = parseFloat(response.data[response.data.length - 1]['1H'])
        const oldPrice = parseFloat(response.data[0]['1H'])

        if (newPrice > oldPrice) setPriceColour('#8AFF6C')
        else if (oldPrice > newPrice) setPriceColour('#F52C38')
      })

    setReady(true)

  }, [])

  return ready && (<div className="w-full bg-gray-300 rounded-lg px-6 py-4 mb-4 shadow-xl">

    {/* <ResponsiveContainer width={200} height={90}> */}
      <LineChart
        width={230}
        height={90}
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
    {/* </ResponsiveContainer> */}

    <div className="text-white mt-6">{today}</div>
    <div className="text-white font-bold text-2xl">{timestamp}</div>
    {tz !== null && tz !== undefined && tz !== '' && <div className="text-white
      opacity-75 text-sm mb-8">
      {tz}
    </div>}

    <div className="text-white font-normal text-sm">
      <ul className="list-none list-inside">
        <li><span className="text-teal font-bold">&#9737;</span> New York
          <span className="rounded-lg bg-black h-2 w-20 float-right relative"
            style={{top: '0.425rem'}}>
            <span className="rounded-lg gr-blue h-2 float-left relative"
            style={{top: '0rem', width: '75%'}}></span>
          </span>
        </li>
        <li><span className="text-pink font-bold">&#9737;</span> London
          <span className="rounded-lg bg-black h-2 w-20 float-right relative"
            style={{top: '0.425rem'}}>
            <span className="rounded-lg gr-purple h-2 float-left relative"
            style={{top: '0rem', width: '75%'}}></span>
          </span>
        </li>
        <li><span className="text-yellow font-bold">&#9737;</span> Tokyo
          <span className="rounded-lg bg-black h-2 w-20 float-right relative"
            style={{top: '0.425rem'}}>
            <span className="rounded-lg gr-yellow h-2 float-left relative"
            style={{top: '0rem', width: '75%'}}></span>
          </span>
        </li>
      </ul>
    </div>

  </div>)
}

export default Markets
