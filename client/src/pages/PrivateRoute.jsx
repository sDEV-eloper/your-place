import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const userData=useSelector((state)=>state.user.currentUser)
    // console.log("first profile", userData)
  return (
    <>
    {userData? <Outlet/> : <Navigate to="/sign-in"/>}
    </>
  )
}

export default PrivateRoute
