import { Container, Navbar, Nav, Button, Modal  } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import LoginUser from './LoginUser'
import { UserContext } from '../context/UserContext'
import { CartContext } from '../context/CartContext'
import Image from '../assets/wxman-knits-logos-bw-1.png'


export default function NavBarS() {

  const navigate = useNavigate();

  const {user, logoutUser} = useContext(UserContext)
  const {cartQuantity, openCart} = useContext(CartContext)

  const [ expanded, setExpanded] = useState(false)
  const [ showModal, setShowModal ]= useState(false)

  const closeModal = () =>  setShowModal(false)

  function handleAccountButton() {
    if(user) {
      navigate("/account")
    } else {
      setShowModal(true)
    }
  }
  
  return(
    <>
      <Navbar className='bg-white shadow-sm mb-3 d-flex'>
        <Navbar.Brand href="/">
          <img
          src={Image}
          width="150"
          height="75"
          />
        </Navbar.Brand>
        <Container className='mx-0'>
        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto justify-content-end" style={{fontFamily: 'Indie Flower', fontSize: "large", fontWeight: "bold"}}> 
              <Nav.Link className="navbar-navlinks" onClick={() => setExpanded(false)} as={Link} to="/">Home</Nav.Link>
              <Nav.Link className="navbar-navlinks" onClick={() => setExpanded(false)} as={Link} to="/about">About Wxmanknits</Nav.Link>
              <Nav.Link className="navbar-navlinks" onClick={() => setExpanded(false)} as={Link} to="/shop">Shop</Nav.Link>
              <Nav.Link className="navbar-navlinks" onClick={() => setExpanded(false)} as={Link} to="/account">My Account</Nav.Link>
            </Nav>
            <Button 
              variant='outline-primary' 
              onClick={handleAccountButton}
              title='My Account'
              style={{fontFamily: 'Kanit'}}
              >
              <FontAwesomeIcon icon={faCircleUser}/>
              {user ? ` ${user.username}`: " Sign in"}
              </Button>
              <Button 
                className="ms-3" 
                variant="outline-danger"
                title='Log out' 
                onClick={() => logoutUser()}><FontAwesomeIcon 
                icon={faRightFromBracket} 
                size="sm"
              />
              </Button>
              <Button 
                className='ms-2 rounded-circle'
                variant="outline-primary" 
                style={{ height: "3rem", width: "3rem", position: "relative"}}
                onClick={openCart}
                title='My Cart'
              >
                <FontAwesomeIcon icon={faCartShopping} size="lg" />
                {  cartQuantity > 0 ?
                <div 
                  className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
                  style={{
                    color: "white", 
                    width:"1.5rem", 
                    height: "1.5rem",
                    position:"absolute",
                    top: 0,
                    right: 0,
                    transform: "translate(15px)",
                  }}
                >
                  {cartQuantity}
                </div>
                : 
                  null
                }
              </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in to your account:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginUser closeModal={closeModal}/>
        </Modal.Body>
        <Modal.Footer>
          <p>Dont have an account?</p><NavLink to='/new_user' onClick={closeModal}>Click here to create an account!</NavLink>
        </Modal.Footer>
      </Modal>
    </>
  )

}