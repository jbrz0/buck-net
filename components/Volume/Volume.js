import { useState, useEffect } from 'react'
import axios from 'axios'

function Volume(props) {

  // const btcData = props.changes[0]

  const [daily, setDaily] = useState('')
  const [weekly, setWeekly] = useState('')
  const [monthly, setMonthly] = useState('')

  const [dP, setDP] = useState('')
  const [wP, setWP] = useState('')
  const [mP, setMP] = useState('')

  useEffect(() => {

    //? Get volume data
    axios.get(`http://localhost:5000/volume-buy-sell`)
      .then(response => {
        setDaily(response.data.allVol)
        setDP((response.data.allVol / 400000) * 100)
      })
    axios.get(`http://localhost:5000/volume-buy-sell-w`)
      .then(response => {
        setWeekly(response.data.allVol)
        setWP((response.data.allVol / 1200000) * 100)
      })
    axios.get(`http://localhost:5000/volume-buy-sell-m`)
      .then(response => {
        setMonthly(response.data.allVol)
        setMP((response.data.allVol / 3900000) * 100)
      })

  }, [])

  return (<div className="w-full bg-gray-300 rounded-lg py-4 px-6 shadow-xl">
    <h3 className="text-white text-md mb-2">Daily Volume</h3>
    {/* <h4 className="text-white text-lg font-bold">{btcData.volume.substring(0,10)}</h4> */}
    <h4 className="text-white text-lg font-bold mb-6">{daily}</h4>

    <ul className="list-none list-inside">
      <li className="mb-8">
        <div className="text-xs text-white font-bold overflow-auto">
          <span className="float-left">Daily</span>
          <span className="float-right font-normal text-gray-100">{daily}</span>
          </div>
        <span className="rounded-lg bg-black h-2 w-full float-left relative"
          style={{top: '0.425rem'}}>
          <span className="rounded-lg gr-blue h-2 float-left relative max-w-full"
          style={{top: '0rem', width: `${dP}%`}}></span>
        </span>
      </li>
      <li className="mb-8">
        <div className="text-xs text-white font-bold">
          <span>Weekly</span>
          <span className="float-right font-normal text-gray-100">{weekly}</span>
        </div>
        <span className="rounded-lg bg-black h-2 w-full float-left relative"
          style={{top: '0.425rem'}}>
          <span className="rounded-lg gr-yellow h-2 float-left relative max-w-full"
          style={{top: '0rem', width: `${wP}%`}}></span>
        </span>
      </li>
      <li className="mb-8">
        <div className="text-xs text-white font-bold">
          <span>Monthly</span>
          <span className="float-right font-normal text-gray-100">{monthly}</span>
        </div>
        <span className="rounded-lg bg-black h-2 w-full float-left relative"
          style={{top: '0.425rem'}}>
          <span className="rounded-lg gr-purple h-2 float-left relative max-w-full"
          style={{top: '0rem', width: `${mP}%`}}></span>
        </span>
      </li>
    </ul>

  </div>)
}

export default Volume
// 3900
// 350000
// 4800000
