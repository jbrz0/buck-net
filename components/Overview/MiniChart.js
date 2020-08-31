import {LineChart, YAxis, Tooltip, Line, ResponsiveContainer} from 'recharts'

function MiniChart(props) {
  return <div className="col-span-3 sm:col-span-1 relative mx-auto">
    <div className="mb-3">
      <div className="text-white font-bold uppercase inline-block">{props.ticker}</div>
      <div className="text-white ml-3 text-gray-200 inline-block">{props.name}</div>
    </div>
    <div className="text-3xl font text-white absolute z-0 bottom-0 left-0">{props.price}</div>

    {/* ETH Chart */}
    <LineChart
      width={props.width}
      height={props.height}
      data={props.data}
      >
      <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} />
      <Tooltip
        contentStyle={{background: 'black', border: 0, borderRadius: '1rem', fontSize: '0.8rem', color: 'white'}}
        labelStyle={{display: 'none'}}
        itemStyle={{color: '#CCD0DB'}}/>
      <Line type="monotone"
      dataKey="1H"
      stroke={'#00F1E7'}

      strokeWidth={2}
      dot={false}
      />
    </LineChart>
  </div>
}

export default MiniChart
