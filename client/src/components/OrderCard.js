import { Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { formatCurrency } from "../utilities/FormatCurrency"
import { formatDate } from "../utilities/FormatDate"


function OrderCard({order}) {


  const {id, number_of_items, order_items,total_cost, created_at} = order

  return (
    <Card className="w-50 my-3">
      <Card.Body>
        <Card.Title>Order # {id} </Card.Title>
          <span>Purchased : {formatDate(created_at)}</span>
          <br /> 
          <span>Status: <FontAwesomeIcon icon={faCheck} size="lg" style={{color: "green"}}/>{' '}<span>Paid</span></span>
          <br/>
          Items Purchased:
          <ul>
          {
            order_items.map(item => 
                <li key={item.name}>{item.name}
                  <p>{item.quantity_purchased} x {formatCurrency(item.cost)}</p>
                </li>
              )
          }
          </ul>
          <div className="d-flex justify-content-between">
            Total numbers of Items: {number_of_items} 
            <br/>
            Total Cost: {formatCurrency(total_cost)}
          </div>
      </Card.Body>
    </Card>
  )
}

export default OrderCard