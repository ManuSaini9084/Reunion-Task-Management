import { useEffect, useState } from "react";
import { TodoCart } from "../components/TodoCart";

import "../App.css";
import { Modal } from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, postTasks } from "../redux/action";
import { Navigate, useNavigate } from "react-router-dom";

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphaGlyIiwidXNlcklEIjoiNjYwNDZmZjE1YmQ5Y2VmOGU0YWFhYTlkIiwiaWF0IjoxNzExNTY2ODQ5fQ.MrVzxBX73C-v1wEQBdZ7bJx3f_QIlGAC_A5SFVNb7aY'

export const initialStateTask = { title: '', description: '' }
const Homepage = () => {

    const navigate = useNavigate();
    const tasks = useSelector(store => store.tasks)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(initialStateTask);
    const dispatch = useDispatch();
    const [render , setRender]= useState(false)

    const token = useSelector(store => store.token)
    let isAuth = token || localStorage.getItem("token") ;
    if(isAuth == undefined) isAuth=""

    const openModal = () =>  setIsModalOpen(true);
    const closeModal = () =>   setIsModalOpen(false);

    const submitNewTodo = (e) => {
        e.preventDefault();
        if (formData.title === "") {
            alert("Please enter your title");
        } else {
            const newTodo = {
                title: formData.title,
                description: formData.description,
                status: false,
            };
            dispatch(postTasks(newTodo,token))
            setFormData(initialStateTask)
            closeModal()
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const hendleRender =()=>  setRender(!render)
    
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

    useEffect(()=>{
        dispatch(getTasks(token))
    },[render])

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8  mt-5">All Tasks</h1>
            <div className="w-11/12 m-auto">
                <div className="mb-5">
                    <button type="button" onClick={handleOpenModal} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create new Task</button>
                </div>
            
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 grid-cols-3 gap-10">
                    {tasks?.length > 0 &&
                        tasks?.map((item, i) => (
                            <TodoCart
                                key={item.id}
                                sr= {i+1}
                                handleRender = {hendleRender}
                                {...item}
                            />
                        ))
                    }
                </div>
            </div>

            <div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className=" sm:w-90 lg:w-96  p-5">
                        <h2 className="text-center text-2xl text-orange-400">Add New Task</h2>
                        <form class="max-w-sm mx-auto" onSubmit={submitNewTodo}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your Title</label>
                                <input rows="4" name="title" value={formData.title} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a title here..." required />
                            </div>
                            <div>
                                <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-black">Your Description</label>
                                <textarea rows="4" name="description" value={formData.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a description here..." required></textarea>
                            </div>
                            <input type="Submit" value="Submit" className="block p-2.5 w-full text-sm text-white bg-green-500 rounded mt-5 cursor-pointer" />
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export { Homepage };
