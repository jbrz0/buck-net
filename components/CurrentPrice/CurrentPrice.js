function CurrentPrice() {
  return <div className="w-full bg-gray-300 rounded-lg px-8 py-6">
    <h3 className="text-white text-lg font-medium mb-2">Current Price</h3>
    <div className="text-3xl font-bold text-white">
      9620
      <span className="text-gray-50">.33</span>

      <div className=" ml-2 mr-1 arrow-up"></div>
      <span className="text-green text-sm font-normal">10%</span>
      {/* <div className="ml-2 arrow-down"></div> */}
      <div className="opacity-75 text-sm font-normal mb-2">
        Price Last Hour: 1.02963
      </div>
    </div>
  </div>
}

export default CurrentPrice
