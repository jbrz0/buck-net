function Overview() {
  return <div className="col-span-3 rounded-lg bg-gray-300">
    <h2 className="tracking-widest text-center text-gray-50 opacity-75 font-bold text-xl">BTC/USDT</h2>

    <div className="relative bg-blue"
      style={{minHeight: '550px'}}>
      <div className="absolute z-0 bg-no-repeat bg-center bg-contain mx-auto left-0 right-0"
      style={{backgroundImage: 'url(/main.svg)', width: '550px', height: '530px', backgroundColor: 'red'}}
      ></div>
    </div>

    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1 bg-yellow">test1</div>
      <div className="col-span-1 bg-yellow">test1</div>
      <div className="col-span-1 bg-yellow">test1</div>
    </div>
  </div>
}

export default Overview
