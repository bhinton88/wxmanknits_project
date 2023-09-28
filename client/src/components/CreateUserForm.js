import {Form, Button, Row, Col } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { states } from '../data/States'
import { UserContext } from '../context/UserContext'

function CreateUserForm () {

  const { createNewUser, errors } = useContext(UserContext)

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation:"",
    full_name: "",
    address: "",
    city: "",
    state: "",
    zip_code: 0,
    email: "",
    admin_rights: true
  })

  function onChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  function onSubmit (event){
    event.preventDefault()
    createNewUser(formData)
  }

  return (
    <Form className='d-flex flex-column' onSubmit={onSubmit}> 
      <Row className='mb-3'>
        <Form.Group as={Col}>
          <Form.Label>Full Name:</Form.Label>
          <Form.Control
            name="full_name"
            type="text" 
            placeholder="Enter Full Name" 
            value={formData.full_name}
            onChange={onChange}
          />
        </Form.Group>
      </Row>
      <Row className='mb-3'>
        <Form.Group as={Col}>
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            name="username"
            type="text" 
            placeholder="Enter Username" 
            value={formData.username}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            name="email"
            type="email" 
            placeholder="email@example.com" 
            value={formData.email}
            onChange={onChange}
          />
        </Form.Group>
      </Row>
      <Row className='mb-3'>
        <Form.Group as={Col}>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            name="password"
            type="password" 
            placeholder="Enter Password" 
            value={formData.password}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            name="password_confirmation"
            type="password" 
            placeholder="Confirm Password" 
            value={formData.password_confirmation}
            onChange={onChange}
          />
        </Form.Group>
      </Row>
      <Row className='mb-3'>
        <Form.Group as={Col}>
          <Form.Label>Address:</Form.Label>
          <Form.Control 
            name="address"
            value={formData.address}
            placeholder="1234 Main St"
            onChange={onChange}
          />
        </Form.Group>
      </Row>
      <Row className='mb-3'>
        <Form.Group as={Col}>
          <Form.Label>City:</Form.Label>
          <Form.Control 
            name="city"
            value={formData.city}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>State:</Form.Label>
          <Form.Select
            name="state"
            value={formData.state}
            onChange={onChange}
          >
            {states.map(state => <option key={state.name} value={state.name}>{state.name}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Zip Code:</Form.Label>
          <Form.Control 
            name="zip_code"
            value={formData.zip_code}
            onChange={onChange}
          />
        </Form.Group>
      </Row>
      <Form.Text>
        <ul>
          {
            errors.map(value => <li style={{color: "red" }}><strong>{value}</strong></li>)
          }
        </ul>
      </Form.Text>
      <Button variant="primary" type="submit">
        Create Account!
      </Button>
    </Form>
  )


}

export default CreateUserForm; 