import { useContext } from "react"
import AccountTabs from "../components/AccountTabs"
import { UserContext } from "../context/UserContext"


function Account () {

  const {user} = useContext(UserContext)

  return(
    <>
      { user ?
        <AccountTabs />
        :
        <h1> Please Login or create an account! </h1>
      }
    </>

  )

}

export default Account