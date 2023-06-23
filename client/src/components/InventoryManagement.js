import { useContext, useState } from "react"
import {CategoryContext } from "../context/CategoriesContext"
import CategoryTable from "./CategoryTable"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons"
import NewItemModal from "./NewItemModal"


function InventoryManagement() {

  const { categories } = useContext(CategoryContext)

  // on click of the add item, we need to render the modal or update its show property

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false); // we will need to use then when the new Item is added and comes back completed
  const handleShow = () => setShow(true);


  return (
    <>
      <div className="d-flex justify-content-between">
        <h1 className="mb-2">Inventory Management:</h1>
        <Button
          className="me-4"
          onClick={() => handleShow()} 
          title="Add a new item"
        >
          <FontAwesomeIcon icon={faSquarePlus} size='xl' />{' '}
          Add New Item
        </Button>
      </div>
      {
        categories.map((category) => {
          return <CategoryTable key={category.id} category={category} />
        })
      }
      <NewItemModal show={show} handleClose={handleClose}/>
    </>
  )
}

export default InventoryManagement