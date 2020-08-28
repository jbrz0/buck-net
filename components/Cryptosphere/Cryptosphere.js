function Cryptosphere(props) {

  const prices = props.prices
  const changes = props.changes

  function upOrDown(i, coinPrice) {
    const prev = parseFloat(changes[i].prevClosePrice)
    // const current = parseFloat(changes[i].lastPrice)
    const current = parseFloat(coinPrice)
    if (prev > current) return 'relative arrow-down'
    else if (current > prev) return 'relative arrow-up'
    else return 'relative '
  }

  const coins = ['bitcoin','ethereum','ripple','chainlink','litecoin','cardano','eos','tezos','stellar','tron']

  return prices !== undefined && changes[0] !== undefined && <div className="w-full bg-gray-300 rounded-lg py-4 px-6 mb-4 shadow-xl">

    <h3 className="text-white text-md mb-6">Cryptosphere</h3>
    {/* <div className="text-3xl font-bold text-white mb-6">12800</div> */}

    {/* TODO:Teal/purple chart will be volumes of cryptosphere coins in v2 */}

    <div className="grid grid-cols-5 mb-4">
      {coins.map((coin, i) => <div className="col-span-1 mb-3" key={i}>
        <img className="mx-auto w-5" src={`/logos/${coin}.png`} alt="coin icon" />
      </div>)}
    </div>

    <div className="grid grid-cols-9 text-white text-sm mb-2">
      <div className="col-span-3">Bitcoin</div>
      <div className="col-span-2 text-gray-200">{changes[0].priceChangePercent.substring(0,4)}%</div>
      <div className="col-span-3 text-gray-100">{prices.bitcoin !== undefined && prices.bitcoin.substring(0,8)}</div>
      <div className={upOrDown(0, prices.bitcoin)} style={{top: '0.25rem'}}></div>
    </div>
    <div className="grid grid-cols-9 text-white text-sm mb-2">
      <div className="col-span-3">Ethereum</div>
      <div className="col-span-2 text-gray-200">{changes[1].priceChangePercent.substring(0,4)}%</div>
      <div className="col-span-3 text-gray-100">{prices.ethereum !== undefined && prices.ethereum.substring(0,8)}</div>
      <div className={upOrDown(1, prices.ethereum)} style={{top: '0.25rem'}}></div>
    </div>
    <div className="grid grid-cols-9 text-white text-sm mb-2">
      <div className="col-span-3">Ripple</div>
      <div className="col-span-2 text-gray-200">{changes[4].priceChangePercent.substring(0,4)}%</div>
      <div className="col-span-3 text-gray-100">{prices.ripple !== undefined && prices.ripple.substring(0,8)}</div>
      <div className={upOrDown(4, prices.ripple)} style={{top: '0.25rem'}}></div>
    </div>
    <div className="grid grid-cols-9 text-white text-sm mb-2">
      <div className="col-span-3">Chainlink</div>
      <div className="col-span-2 text-gray-200">{changes[8].priceChangePercent.substring(0,4)}%</div>
      <div className="col-span-3 text-gray-100">{prices.chainlink !== undefined && prices.chainlink.substring(0,8)}</div>
      <div className={upOrDown(8, prices.chainlink)} style={{top: '0.25rem'}}></div>
    </div>
    <div className="grid grid-cols-9 text-white text-sm mb-2">
      <div className="col-span-3">Litecoin</div>
      <div className="col-span-2 text-gray-200">{changes[2].priceChangePercent.substring(0,4)}%</div>
      <div className="col-span-3 text-gray-100">{prices.litecoin !== undefined && prices.litecoin.substring(0,8)}</div>
      <div className={upOrDown(2, prices.litecoin)} style={{top: '0.25rem'}}></div>
    </div>
    <div className="grid grid-cols-9 text-white text-sm mb-2">
      <div className="col-span-3">Cardano</div>
      <div className="col-span-2 text-gray-200">{changes[3].priceChangePercent.substring(0,4)}%</div>
      <div className="col-span-3 text-gray-100">{prices.cardano !== undefined && prices.cardano.substring(0,8)}</div>
      <div className={upOrDown(3, prices.cardano)} style={{top: '0.25rem'}}></div>
    </div>
    <div className="grid grid-cols-9 text-white text-sm mb-2">
      <div className="col-span-3">EOS</div>
      <div className="col-span-2 text-gray-200">{changes[5].priceChangePercent.substring(0,4)}%</div>
      <div className="col-span-3 text-gray-100">{prices.eos !== undefined && prices.eos.substring(0,8)}</div>
      <div className={upOrDown(5, prices.eos)} style={{top: '0.25rem'}}></div>
    </div>
    <div className="grid grid-cols-9 text-white text-sm mb-2">
      <div className="col-span-3">Tezos</div>
      <div className="col-span-2 text-gray-200">{changes[9].priceChangePercent.substring(0,4)}%</div>
      <div className="col-span-3 text-gray-100">{prices.tezos !== undefined && prices.tezos.substring(0,8)}</div>
      <div className={upOrDown(9, prices.tezos)} style={{top: '0.25rem'}}></div>
    </div>
    <div className="grid grid-cols-9 text-white text-sm mb-2">
      <div className="col-span-3">Stellar</div>
      <div className="col-span-2 text-gray-200">{changes[6].priceChangePercent.substring(0,4)}%</div>
      <div className="col-span-3 text-gray-100">{prices.stellar !== undefined && prices.stellar.substring(0,8)}</div>
      <div className={upOrDown(6, prices.stellar)} style={{top: '0.25rem'}}></div>
    </div>
    <div className="grid grid-cols-9 text-white text-sm">
      <div className="col-span-3">Tron</div>
      <div className="col-span-2 text-gray-200">{changes[7].priceChangePercent.substring(0,4)}%</div>
      <div className="col-span-3 text-gray-100">{prices.tron !== undefined && prices.tron.substring(0,8)}</div>
      <div className={upOrDown(7, prices.tron)} style={{top: '0.25rem'}}></div>
    </div>
  </div>
}

export default Cryptosphere
