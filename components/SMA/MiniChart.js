import {LineChart, YAxis, Tooltip, Line, ResponsiveContainer} from 'recharts'

function MiniChart(props) {
  return <>

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
      dataKey={props.dataKey}
      stroke={props.stroke}

      strokeWidth={2}
      dot={false}
      />
    </LineChart>
  </>
}

export default MiniChart
