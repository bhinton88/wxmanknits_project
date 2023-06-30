import {useEffect, useState} from 'react'
import OrderCard from './OrderCard'

function OrderTab() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch('/orders')
    .then(response => response.json())
    .then(data => setOrders(data))
  }, [])

  console.log(orders)
  
  return (
    <div className='d-flex flex-column align-items-center'>
      <h1>Completed Orders:</h1>
      {
        orders.map(order => order.payment.status === "paid" ? <OrderCard key={order.id} order={order} /> : null)
      }
    </div>
  )
}

export default OrderTab