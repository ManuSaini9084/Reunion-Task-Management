import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/action';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleLogout =()=>{
    localStorage.removeItem("token");
    dispatch(logout(navigate))
  }
  return (
    <div className='w-3/12 border-2  m-auto p-10 mt-5 rounded'>
      <h1 className='text-2xl text-center mb-2.5 text-red-500'>User Profile</h1>
      <h3>Username - {user.username}</h3>
      <h3>Email :- {user.email}</h3>
      <button onClick={handleLogout} className="bg-blue-500 ml-20 mt-2.5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
        Logout
      </button>
    </div>
  )
}

export default Profile
