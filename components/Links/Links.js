import Link from 'next/link'

function Links() {
  return <div className="grid grid-cols-4 gap-0">
    <div className="col-span-1">
      <Link href="https://tradingview.com"><a>
        <img
          src="/orb1.svg"
          alt="TradingView Orb"
          className="mx-auto w-12 hover:opacity-75"
        />
      </a></Link>
    </div>
    <div className="col-span-1">
      <Link href="https://binance.com"><a>
        <img
          src="/orb2.svg"
          alt="Binance Orb"
          className="mx-auto w-12 hover:opacity-75"
        />
      </a></Link>
    </div>
    <div className="col-span-1">
      <Link href="https://coindesk.com"><a>
        <img
          src="/orb3.svg"
          alt="Coin Desk Orb"
          className="mx-auto w-12 hover:opacity-75"
        />
      </a></Link>
    </div>
    <div className="col-span-1">
      <Link href="https://coinmarketcap.com"><a>
        <img
          src="/orb4.svg"
          alt="CoinMarketCap Orb"
          className="mx-auto w-12 hover:opacity-75"
        />
      </a></Link>
    </div>
  </div>
}

export default Links
