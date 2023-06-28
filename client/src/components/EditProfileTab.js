import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { Form, Row, Col, Button } from "react-bootstrap"
import { states } from "../data/States"


function EditProfileTab () {
  
  const { user, updateUser, errors, deleteUser } = useContext(UserContext)

  // dont forget to add a delete user functionality


  const {id, username, full_name, address, city, state, zip_code, email} = user

  const [userFormData, setUserFormData] = useState({
    username: username,
    full_name: full_name,
    address: address,
    city: city,
    state: state,
    zip_code: zip_code,
    // email: email
  })

  function onChange(event) {
    setUserFormData({
      ...userFormData,
      [event.target.name]:event.target.value
    })
  }

  function onSubmit(event){
    event.preventDefault()
    updateUser(id, userFormData)
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Name: 
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={userFormData.full_name} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Username: 
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={userFormData.username} />
          </Col>
        </Form.Group>
      {/* all below form elements we want to be able to edit, we do not want to change the Name or the username */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Email Address: 
          </Form.Label>
          <Col sm="10">
            <Form.Control
                name="email"
                type="email" 
                value={userFormData.email}
                onChange={onChange}
              />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Address:
          </Form.Label>
          <Col sm="10">
            <Form.Control 
                name="address"
                value={userFormData.address}
                onChange={onChange}
              />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            City:
          </Form.Label>
          <Col>
            <Form.Control 
              name="city"
              value={userFormData.city}
              onChange={onChange}
            />
          </Col>
          <Col>
            <Form.Label column sm="2">
              State: 
            </Form.Label>
          </Col>
          <Col>
            <Form.Select
              name="state"
              value={userFormData.state}
              onChange={onChange}
            >
            {states.map(state => <option key={state.name} value={state.name}>{state.name}</option>)}
            </Form.Select>
          </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm="2">
                Zip Code: 
              </Form.Label>
            </Col>
            <Col sm="10">
              <Form.Control 
                name="zip_code"
                value={userFormData.zip_code}
                onChange={onChange}
              />
            </Col>
          </Form.Group>
          <Form.Text>
            <ul>
              {
                errors.map(value => <li key={value} style={{color: "red" }}><strong>{value}</strong></li>)
              }
            </ul>
          </Form.Text>
          <Button type="submit">Edit Profile</Button>
          <Button onClick={() => deleteUser(user.id)} className="ms-3">Delete my profile</Button>
      </Form>
    </>

  )

}

export default EditProfileTab