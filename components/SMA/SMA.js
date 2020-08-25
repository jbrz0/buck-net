import { useEffect } from 'react'
import axios from 'axios'

function SMA() {

  useEffect(() => {
    //? Get SMA Data from Alpha Vantage
    //! Test communication between redis server
    axios.get(`http://localhost:5000/sma`)
    .then(function (response) {
      console.log(response.data)
    })

  }, [])

  return <div>SMA</div>
}

export default SMA
