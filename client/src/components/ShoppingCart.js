import { useContext, useState } from "react"
import { Offcanvas, Stack, Button, Toast, ToastContainer } from "react-bootstrap"
import { CartContext } from "../context/CartContext"
import { ItemContext } from "../context/ItemContext"
import CartItem from "./CartItem"
import { formatCurrency } from "../utilities/FormatCurrency"
import { UserContext } from "../context/UserContext"


function ShoppingCart ({isOpen}) {

  const {user} = useContext(UserContext)
  const { closeCart, cartItems, cartQuantity } = useContext(CartContext)
  const {items} = useContext(ItemContext)

  const [showA, setShowA] = useState(false)

  const toggleShowA = () => setShowA(!showA);


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

  function handleCheckout (){
    if(user){
    fetch('/checkout', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        order: {
          number_of_items: cartQuantity,
          total_cost: totalCartCost
        },
        order_items: order_items,
        line_items: lineItems.map(value => value)
      })
    })
    .then(response => response.json())
    .then(data => window.location.href = data[0].redirectUrl)
    } else {
      closeCart()
      toggleShowA()
    }
  }

  console.log(cartItems)

  return (
    <>
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
      <ToastContainer position="top-center" >
        <Toast show={showA} onClose={toggleShowA} delay={5000} autohide>
            <Toast.Header>
              <span className="me-auto">Error:</span>
            </Toast.Header>
            <Toast.Body>Please login or Sign up to complete checkout</Toast.Body>
        </Toast>
      </ToastContainer>
    </>

  )
  
}

export default ShoppingCart