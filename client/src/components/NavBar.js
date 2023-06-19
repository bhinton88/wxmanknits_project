import { Container, Navbar, Nav, Button, Modal  } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-regular-svg-icons'
import LoginUser from './LoginUser'
import { UserContext } from '../context/UserContext'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../context/CartContext'


export default function NavBarS() {

  const navigate = useNavigate();

  const {user} = useContext(UserContext)
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
      <Navbar className='bg-white shadow-sm mb-3'>
        <Container>
          <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => setExpanded(false)} as={Link} to="/">Home</Nav.Link>
                <Nav.Link onClick={() => setExpanded(false)} as={Link} to="/about">About Wxmanknits</Nav.Link>
                <Nav.Link onClick={() => setExpanded(false)} as={Link} to="/shop">Shop</Nav.Link>
                <Nav.Link onClick={() => setExpanded(false)} as={Link} to="/account">My Account</Nav.Link>
              </Nav>
              <Button variant='outline-primary' onClick={handleAccountButton}><FontAwesomeIcon icon={faCircleUser}/>
              {user ? ` ${user.username}`: " Sign in"}
              </Button>

              <Button 
                className='ms-2 rounded-circle'
                variant="outline-primary" 
                style={{ height: "3rem", width: "3rem", position: "relative"}}
                onClick={openCart}
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