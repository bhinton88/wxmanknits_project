import { Table, Stack } from "react-bootstrap"
import ItemActions from "./ItemActions"
import { useContext } from "react"
import { ItemContext } from "../context/ItemContext"
import { formatCurrency } from "../utilities/FormatCurrency"

function CategoryTable({category}) {

  const {category_name } = category

  const { items } = useContext(ItemContext)

  const filteredItems = items.filter(item => item.category_name === category_name)

  return (
    <>
    <Stack gap={2} > 
      <h2>{category_name}</h2>
      <Table 
        striped 
        hover
        bordered
        responsive
      >
        <thead>
          <tr>
            <th>Item Name:</th>
            <th>Description:</th>
            <th>Price:</th>
            <th>Quantity Available:</th>
            <th>Actions:</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredItems.map(item => {
              return(
              <tr key={item.id}>
                <td>{item.item_name}</td>
                <td>{item.description}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>{item.quantity_available}</td>
                <td><ItemActions item={item}/></td>
              </tr>
              )
            })
          }
        </tbody>
        </Table>
      </Stack>
    </>

  )
}

export default CategoryTable