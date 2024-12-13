import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signup } from "../redux/action";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: null,
        password: null,
        username: null,
        confirmPassword: null
    });
  
    const handleSubmit = (e) => {
        e.preventDefault()
        if(formData.password!== formData.confirmPassword)  return alert("Password Does not Match")
        const user = {
            email: formData.email,
            password: formData.password,
            username: formData.username
        };
        dispatch(signup(user,navigate))
    };

    const handleChange =(e)=>{
        const  { name , value } = e.target
        setFormData({...formData , [name]:value})
    }
    
    return (
        <div className="flex justify-center items-center mt-10 ">
            <div class=" border border-black rounded-lg p-8 sm:w-90 lg:w-96">

                <h2 className="text-2xl font-bold mb-7 text-center">Signup Page</h2>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>

                <div className="relative z-0 w-full mb-5 group">
                        <input type="text"  name="username" value={formData.username} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Username</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text"   name="email" value={formData.email} onChange={handleChange}className="block py-2.5 px-0 w-full text-sm  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Email</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password"   name="password" value={formData.password} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    </div>
                   
                   
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>

                <p className="text-center mt-2.5">Already have an Account? <Link to="/login" className="text-red-500">Login</Link></p>
            </div>
        </div>
    );
};

export { Signup };
