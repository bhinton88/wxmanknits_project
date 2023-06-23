import React from 'react'
import { NavLink } from 'react-router-dom';
import Image from "../assets/hook-1727484.svg"

function SuccesfulTransaction() {

  localStorage.clear();
  
  return (
    <div className='d-flex justify-content-center align-items-center mt-4'>
      <img
      src={Image} 
      height="200"
      width="200"
      alt="green check for completed checkout"
      className='me-2'
      />
      <div className='d-flex flex-column'>
        <h2 className='ms-2'>Thank you for your order!</h2>
        <NavLink className="ms-2" to="/account">Completed Orders</NavLink>
      </div>
    </div>
  )
}

export default SuccesfulTransaction