import { useContext } from "react"
import AccountTabs from "../components/AccountTabs"
import { UserContext } from "../context/UserContext"
import { Alert } from "react-bootstrap"


function Account () {

  const {user} = useContext(UserContext)


  return(
    <>
      { user ?
        <AccountTabs />
        :
        <div className="d-flex justify-content-center">
          <Alert className="w-50 d-flex flex-column align-items-center" style={{fontFamily: "Indie Flower"}}variant="info">
            <Alert.Heading>Account Error: </Alert.Heading>
            <p>
              Please login or Sign up to view Account page!
            </p>
          </Alert>
        </div>
      }
    </>

  )

}

export default Account