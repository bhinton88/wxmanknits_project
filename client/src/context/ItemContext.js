import React, {useState, useEffect} from 'react'

const ItemContext = React.createContext({
  items: [],
  errors: [],
  addNewItem: () => {},
  updateItem: () => {},
  deleteItem: () => {}
});

function ItemProvider ({children}) {
  
  const [items, setItems] = useState([])
  const [errors, setErrors]= useState([])


  useEffect(() => {
    fetch('/items')
    .then(response => response.json())
    .then(data => setItems(data))
  }, [])


  function addNewItem (newItem) {
    fetch('/items', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newItem)
    })
    .then(response => {
      if(response.ok){
        response.json().then(newItem => setItems([...items, newItem ]))
      } else {
        response.json().then(data => setErrors(data.errors))
      }
    })
  }


  function updateItem (id, updatedItem) {
    fetch(`/items/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(updatedItem)
    })
    .then(response => {
      if(response.ok){
        response.json().then(updatedItem =>{
          const updatedItemsArray = items.map(item =>{
            if(item.id === updatedItem.id){
              return updatedItem
            } else {
              return item
            }
          })
          setItems(updatedItemsArray)
        })
      } else {
        response.json().then(data => setErrors(data.errors))
      }
    })
  }

  function deleteItem (id) {
    fetch(`/items/${id}`,{
      method: "DELETE",
    })

    const removedItemArray = items.filter(item => item.id !== id)

    setItems(removedItemArray)
  }

  const contextValue = {
    items: items,
    errors: errors,
    addNewItem,
    updateItem,
    deleteItem
  }

  return (
    <ItemContext.Provider value={contextValue}>
      {children}
    </ItemContext.Provider>
  )
}

export {ItemProvider, ItemContext}