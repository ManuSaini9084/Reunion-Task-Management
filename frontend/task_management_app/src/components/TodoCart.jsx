import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, patchTask } from "../redux/action";
import { token } from "../pages/Homepage";
import { useNavigate } from "react-router-dom";


const TodoCart = ({ sr, _id, title, status, description, handleRender }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({title,description,status});
  const dispatch = useDispatch();
  const token = useSelector(store => store.token)
  let isAuth = token || localStorage.getItem("token") ;
  if(isAuth == undefined) isAuth=""
 
  const openModal = () => setIsModalOpen(true);

  const closeModal = () =>   setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const updateTask =(e)=>{
    e.preventDefault()
    dispatch(patchTask(_id, formData, token)).then((res)=>{
      handleRender()
      closeModal()
    })
  }
  const handleOpenModal = ()=>{
    if(!isAuth)
    {
        alert("Please Login");
        navigate("/login")
    }
    else {
        openModal()
    }
}
  
  const handleDelete =()=>{
    // handleOpenModal()
    dispatch(deleteTask(_id, token)).then((res)=>{
      handleRender()
    })
  }

  return (
    <>
      <div className="flex flex-col items-left border-solid border-2 p-5 gap-3 rounded">
        <p>Sr. No :- {sr}</p>
        <p> Title :- {title}</p>
        <p >Description :- {description}</p>
        <p >Status : - <span className={status ? "text-green-500" : "text-red-500"}> {status ? "Completed" : "In Process"} </span></p>
        <div className="flex gap-10">
          <button onClick={ handleOpenModal } className="px-4 py-2 text-white bg-green-500">Edit</button>
          <button onClick={handleDelete} className="px-4 py-2 text-white bg-red-500">Delete</button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="sm:w-90 lg:w-96  p-5">
      <h2 className="text-center text-2xl text-red-500">Update Task</h2>
          <form class="max-w-sm mx-auto" onSubmit={updateTask}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Update Title</label>
              <input rows="4" name="title" value={formData.title} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a title here..." required />
            </div>
            <div>
              <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-black">Update Description</label>
              <textarea rows="4" name="description" value={formData.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a description here..." required></textarea>
            </div>
            <div>
              <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-black">Update Status</label>
              <input rows="4" type="checkbox" name="status" value={formData.status} onClick={(e) => setFormData({...formData, status:e.target.checked ? true : false})} />
            </div>
            <input type="Submit" value="Submit" className="block p-2.5 w-full text-sm text-white bg-green-500 rounded mt-5 cursor-pointer" />
          </form>
        </div>
      </Modal>
    </>
  );
};

export { TodoCart };
