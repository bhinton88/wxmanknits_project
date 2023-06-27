import { Card } from "react-bootstrap"
import { useNavigate } from "react-router"


function CategoryCard ({category}) {

  const navigate = useNavigate();

  function onClick(category_name) {
    navigate(`/shop/${category_name}`)
  }
 
  return(
    <Card style={{height: "250px", borderRadius: 35}} onClick={() => onClick(category.category_name)} className="category-card">
      <Card.Body className="d-flex flex-column justify-content-around">
        <h1>{category.category_name}</h1>
      </Card.Body>
    </Card>
  )

}

export default CategoryCard