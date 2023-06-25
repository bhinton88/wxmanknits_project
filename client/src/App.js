import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarS from "./components/NavBar";
import { Routes, Route } from 'react-router-dom';
import Account from './pages/Account';
import Shop from './pages/Shop';
import ItemList from './components/ItemList';
import CreateUserForm from './components/CreateUserForm';
import SuccesfulTransaction from './components/SuccesfulTransaction';
import FailedTransaction from './components/FailedTransaction';
import { UserProvider } from './context/UserContext';
import { CategoryProvider } from './context/CategoriesContext';
import { ItemProvider } from './context/ItemContext';
import { CartProvider } from './context/CartContext';
import "./index.css" 



function App() {

  return(
    <>
      <ItemProvider>
        <UserProvider>
          <CartProvider>
            <CategoryProvider>
              <NavBarS />
              <Routes>
                {/* will need to create a landing page and use it for our home / */}
                <Route path='/new_user' element={<CreateUserForm />}/>
                <Route path='/account' element={<Account />}/>
                <Route path='/shop' element={<Shop />} />
                <Route path='/shop/:category_name' element={<ItemList />} />
                <Route path='/checkout/complete' element={<SuccesfulTransaction />}/>
                <Route path='/checkout/failure' element={<FailedTransaction />} />
              </Routes>
            </CategoryProvider>
          </CartProvider>
        </UserProvider>
      </ItemProvider>
    </>
  )

}

export default App;
