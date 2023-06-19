import { useContext } from "react"
import { CategoryContext } from "../context/CategoriesContext"
import { Col, Row } from "react-bootstrap"
import CategoryCard from "../components/CategoryCard"

// want category cards, which when clicked on will take us to all the items of that category
// 


function Shop () {

  const { categories } = useContext(CategoryContext)

  return (
    <>
    <h1 align="center" className="p-3">Categories:</h1>
      <Row xs={1} md={3} className="g-4 d-flex justify-content-center">
        {
          categories.map(category =>{
            return(
            <Col align="center" key={category.id}>
              <CategoryCard category={category}/>
            </Col>
            )
          })
        }
      </Row>
    </>
  )

}

export default Shop