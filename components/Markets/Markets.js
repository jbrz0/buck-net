import moment from 'moment'

function Markets() {
  const today = moment().format('dddd MMM D, YYYY')
  const timestamp = moment().format('h:MM A')
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  return <div className="w-full bg-gray-300 rounded-lg px-6 py-4">

    <span className="text-gray-200 text-2xl">CHART</span>

    <div className="text-white">{today}</div>
    <div className="text-white font-bold text-2xl">{timestamp}</div>
    {tz !== null && tz !== undefined && tz !== '' && <div className="text-white
      opacity-75 text-sm">
      {tz}
    </div>}


  </div>
}

export default Markets
