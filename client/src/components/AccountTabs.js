import { Tabs,Tab } from "react-bootstrap"
import InventoryManagement from "./InventoryManagement"
import EditProfileTab from "./EditProfileTab"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import OrderTab from "./OrderTab"

function AccountTabs () {

  const { user } = useContext(UserContext)

  return(
    <Tabs 
    defaultActiveKey="profile"
    className="mb-3"
    justify
  >
    <Tab eventKey='profile' title="Profile">
      <EditProfileTab />
    </Tab>
    <Tab eventKey="orders" title="Orders">
      <OrderTab />
    </Tab>
    {
      user.admin_rights ?
      <Tab eventKey="inventoryManagement" title="Manage Inventory">
        <InventoryManagement />
      </Tab>
      :

      null
    }
  </Tabs>

  )

}

export default AccountTabs