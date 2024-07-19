import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
function LogOutBtn() {
    const dispatch = useDispatch();
    const logouthandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button onClick={logouthandler} className='inline-block px-6 py-2 duration-200 hover:bg-red-200 rounded-full'
    >Logout</button>
  )
}

export default LogOutBtn