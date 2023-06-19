import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import UpdateItemModal from "./UpdateItemModal";
import { useContext, useState } from "react";
import { ItemContext } from "../context/ItemContext";

 function ItemActions ({ item }) {

  const [show, setShow] = useState(false)

  const { deleteItem }= useContext(ItemContext)

  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true);


  return (
    <>
      <Button variant="success" size="sm" onClick={handleShow}>
        <FontAwesomeIcon icon={faPencil} size="xs" />
      {/* here we will add button which EDITS this item */}
      </Button>
      <Button variant="danger" size="sm" onClick={() => deleteItem(item.id)}>
        <FontAwesomeIcon icon={faTrash} size="xs" />
      {/* here we will add a button which DELETES the item */}
      </Button>
      <UpdateItemModal 
        item={item}
        show={show}
        handleClose={handleClose}
      />
    </>
  )
}

export default ItemActions;
