import React from 'react'
import { Alert } from 'react-bootstrap'


function FailedTransaction() {
  return (
    <div className='d-flex justify-content-center'>
      <Alert className="w-50 d-flex flex-column align-items-center" style={{fontFamily: "Indie Flower"}} variant="danger">
        <Alert.Heading>Transaction Error: </Alert.Heading>
          <p>
           Oh no! it looks like the transaction either did not process or was cancelled. Your cart is still 
           intact. When you are ready to check out please go back to the checkout button in the cart. 
          </p>
      </Alert>
    </div>
  )
}

export default FailedTransaction