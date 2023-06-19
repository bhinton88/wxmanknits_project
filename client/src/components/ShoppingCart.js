import { useContext } from "react"
import { Offcanvas, Stack, Button } from "react-bootstrap"
import { CartContext } from "../context/CartContext"
import { ItemContext } from "../context/ItemContext"
import CartItem from "./CartItem"
import { formatCurrency } from "../utilities/FormatCurrency"


function ShoppingCart ({isOpen}) {

  const { closeCart, cartItems, cartQuantity } = useContext(CartContext)
  const {items} = useContext(ItemContext)

  const totalCartCost = cartItems.reduce((total, cartItem) => {
    const item = items.find(item => item.id === cartItem.id)
    return total + cartItem.quantity*(item?.price || 0)
  }, 0)

  const lineItems = cartItems.map(cartItem => {
    const item = items.find(item => item.id === cartItem.id)
    if(item === undefined){
      return null
    }
    return(
      {
        price: item.price_id,
        quantity: cartItem.quantity
      }
    )
  })

  const order_items = cartItems.map(cartItem => {
    const item = items.find(item => item.id === cartItem.id)
    if(item === undefined){
      return null
    }
    return(
      {
        item_id : cartItem.id,
        cost: (item.price*cartItem.quantity),
        quantity: cartItem.quantity
        
      }
    )
  })

  console.log(lineItems)

  console.log(order_items)

  function handleCheckout (){
    fetch('/checkout', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        order: {
          number_of_items: cartQuantity,
          total_cost: totalCartCost,
          order_items: order_items
        },
        line_items: lineItems
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  return (
    <Offcanvas className="w-40" show={isOpen} onHide={closeCart}  placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3} className="mb-3">
          {
            cartItems.map(item => {
              return <CartItem key={item.id} item={item} />
            })
          }
          <div className="ms-auto fw-bold fs-5">
            Total: {formatCurrency(totalCartCost)}
          </div>
        </Stack>
        <Stack >
          <Button onClick={() => handleCheckout()}>Checkout</Button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
    // need to create some logic that when our checkout button is pressed, it first checks to see if they are a user, if not
    // a modal will pop up asking them to create a user account first 
  )
  
}

export default ShoppingCart