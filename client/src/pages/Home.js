import React from 'react'
import tornado from "../assets/wxman-knits-icon.jpg"
import { Card, Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRavelry, faInstagram } from '@fortawesome/free-brands-svg-icons'
import scarf from "../assets/IMG_2897.jpeg"
import me from "../assets/IMG_4704.jpeg"
import shawl from "../assets/IMG_6879.jpeg"
import llama from "../assets/IMG_4841.jpeg"



function Home() {

  const cardImgStyles = {
    objectFit: "cover",
    borderRadius: 55
  }
  return (
    <>
    <div className='d-flex justify-content-center'>
      <img 
        src={tornado}
        alt="ball of yarn being unwound in the shape of a tornado"
        height="300px"
      />
    </div>
    <div className='d-flex justify-content-center my-5'>
      <h1 style={{fontFamily: 'Indie Flower', fontWeight: 'bold'}}>WELCOME TO WXMAN KNITS!</h1>
    </div>
    <div className='d-flex justify-content-center my-5' style={{borderRadius: 55}}>
      <Row>
        <Col>
          <Card className='mx-3 homeCard'>
            <Card.Img  src={scarf} style={cardImgStyles}/>
          </Card>
        </Col>
        <Col>
          <Card className='mx-3 homeCard'>
            <Card.Img src={llama} style={cardImgStyles}/>
          </Card>
        </Col>
        <Col>
          <Card className='mx-3 homeCard'>
            <Card.Img src={shawl} style={cardImgStyles}/>
          </Card>
        </Col>
      </Row>
    </div>
    <Container fluid className='d-flex justify-content-center'>
      <Card className='mt-3 w-75 d-flex align-items-center border-0 shadow' style={{borderRadius: 55}}>
        <Row>
          <Col>
            <Card.Img src={me}  className='m-4' style={{ objectFit: 'cover', borderRadius: 45}}/>
          </Col>
          <Col>
            <Card.Body>
            <Card.Title 
              style={{fontFamily: 'Indie Flower', fontWeight: 'bold', fontSize: "30px", textDecoration:"underline"}}
            >
              ABOUT WXMAN KNITS: 
            </Card.Title>
            <Card.Text>
            Welcome to my site! A place for me, Bobby, to sell my finished knitted objects along with destash yarn. You might be asking yourself, what does the wx in wxman mean? Well us Meteorologists love to use wx as a shorthand for weather. As such, you guessed it, I am a weatherman and I also love to knit/crochet/craft! Enjoy and I hope you find something you like! Feel free to add me on any of the socials below!
            </Card.Text>
            <Card.Text className='d-flex justify-content-around'>
            <a 
              title='Wxman knits on Ravelry' 
              className='ravelryLink' 
              href="https://www.ravelry.com/people/Wxmanknits" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faRavelry} size="2xl" />
            </a>
            <a 
              title='Wxman knits on Instagram' 
              className='instaLink' 
              href='https://www.instagram.com/wxmanknits/' 
              target='_blank'
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="2xl" />
            </a>
            </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
    </>
  )

}

export default Home