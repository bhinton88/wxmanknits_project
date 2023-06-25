import React from 'react'
import tornado from "../assets/wxman-knits-icon.jpg"



function Home() {
  return (
    <>
    <div className='d-flex justify-content-center'>
      <img 
      src={tornado}
      />
    </div>
    <div className='d-flex justify-content-center'>
      <h1 style={{fontFamily: 'Indie Flower', fontWeight: 'bold'}}>Welcome to Wxman knits!</h1>
    </div>
    </>
  )

}

export default Home