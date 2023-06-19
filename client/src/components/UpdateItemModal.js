import React, { useContext } from 'react'
import { Modal,Form, Row, Col, Button } from 'react-bootstrap'
import { useState } from 'react'
import { ItemContext } from '../context/ItemContext'

function UpdateItemModal({ item, show, handleClose }) {


  const {updateItem, errors } = useContext(ItemContext)

  const [formData, setFormData] = useState({
    item_name: item.item_name,
    price: item.price,
    description: item.description,
    quantity_available: item.quantity_available,
  })

  function onChange (event) {
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
    })
  }

  function handleCategoryChange (event){
    setFormData({
      ...formData,
      [event.target.name]: parseInt(event.target.value)
    })
  }

  function handlePriceChange (event) {
    setFormData({
      ...formData,
      [event.target.name]: parseFloat(event.target.value)
    })
  }

  function onSubmit(event){
    event.preventDefault()
    updateItem(item.id, formData)
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Update an Item:</Modal.Title>
      </Modal.Header>
      <Form className='d-flex flex-column m-3' onSubmit={onSubmit}> 
          <Row className='mb-3'>
            <Form.Group as={Col}>
              <Form.Label>Item Name:</Form.Label>
              <Form.Control
                name="item_name"
                type="text" 
                value={formData.item_name}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Item Price:</Form.Label>
              <Form.Control
                name="price"
                type="number" 
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handlePriceChange}
              />
            </Form.Group> 
            <Form.Group as={Col}>
              <Form.Label>Quantity Available:</Form.Label>
              <Form.Control
                name="quantity_available"
                type="number" 
                min="0"
                step="1"
                value={formData.quantity_available}
                onChange={handleCategoryChange}
              />
            </Form.Group>     
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col}>
              <Form.Label>Item Description</Form.Label>
              <Form.Control 
                name="description"
                as="textarea"
                rows={4} 
                placeholder="Enter a brief description about the item" 
                value={formData.description}
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
          <div className="d-flex mt-3 justify-content-center">
              <Button type="submit">
                Update Item
              </Button>
          </div>
        </Form>
    </Modal>
  )
}

export default UpdateItemModal