import React ,{ useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const UserContext = React.createContext({
  user: { },
  errors: [],
  createNewUser: () => {},
  loginUser: () => {},
  logoutUser: () =>{},
  updateUser: () => {},
  deleteUser: () => {}
});

function UserProvider({children}){

  const navigate = useNavigate();

  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetch('/me')
    .then(response => {
      if(response.ok){
        response.json().then(user => setUser(user))
      }
    })
  }, [])


  function createNewUser (newUser){
    fetch('/users', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newUser)
    })
    .then(response => {
      if(response.ok){
        response.json().then(newUser => {
          setUser(newUser)
          navigate('/account')
        })
      } else {
        response.json().then(data => setErrors(data.errors))
      }
    })
  }

  function loginUser (userLoggingIn) {
    fetch('/login',{
      method: "POST",
      headers: { "Content-Type":"application/json"},
      body: JSON.stringify(userLoggingIn)
    })
    .then(response => {
      if(response.ok) {
        response.json().then(userLogging => setUser(userLogging));  
      } else {
        response.json().then(data => setErrors(data.errors));
      }
    })
  }

  function logoutUser() {
    fetch('/logout',{
      method: "DELETE"
    })

    setUser(null)
  }

  function updateUser(id, updatedUser) {
    fetch(`/users/${user.id}`,{
      method: "PATCH",
      headers: {"Content-type":"application/json"},
      body: JSON.stringify(updatedUser)
    })
    .then(response => {
      if(response.ok){
        response.json().then(userUpdated => {
          setUser(userUpdated)
        })
      } else {
        response.json().then(data => setErrors(data.errors))
      }
    })
  }

  function deleteUser(id) {
    fetch(`users/${id}`,{
      method: "DELETE"
    })

    setUser(null)
    navigate(`/home`)
  }

  const contextValue ={
    user: user,
    errors: errors,
    createNewUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser
  }

  return(

    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

export {UserProvider, UserContext} 