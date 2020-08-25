import moment from 'moment'
import { useState, useEffect } from 'react'
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer} from 'recharts'
import chartDemoData from './chartDemoData'

function Markets() {
  const today = moment().format('dddd MMM D, YYYY')
  const timestamp = moment().format('h:MM A')
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  const [priceColour, setPriceColour] = useState('#9292C1')

  useEffect(() => {

    const newPrice = chartDemoData[0].pv
    const oldPrice = chartDemoData[chartDemoData.length - 1].pv
    if (newPrice > oldPrice) setPriceColour('#8AFF6C')
    else if (oldPrice > newPrice) setPriceColour('#F52C38')

  }, [])

  return <div className="w-full bg-gray-300 rounded-lg px-6 py-4">

    {/* <span className="text-gray-200 text-2xl">CHART</span> */}
    {/* <ResponsiveContainer width={300} height={200}> */}
    {/* #F52C38 */}
      <LineChart width={200} height={100} data={chartDemoData}>
        <Tooltip />
        <Line type="monotone"
        dataKey="pv"
        stroke={priceColour}

        strokeWidth={3}
        dot={false}
        />
      </LineChart>
    {/* </ResponsiveContainer> */}

    <div className="text-white">{today}</div>
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

  </div>
}

export default Markets
