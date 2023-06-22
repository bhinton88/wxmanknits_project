import {useEffect, useState} from 'react'

function OrderTab() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch('/orders')
    .then(response => response.json())
    .then(data => setOrders(data))
  }, [])

  console.log(orders)
  
  return (
    <div>OrderTab</div>
  )
}

export default OrderTab