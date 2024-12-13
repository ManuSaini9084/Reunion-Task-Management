
import { DELETE_TASK, ERROR, GET_TASKS, LOADING,  LOGIN,  LOGOUT,  PATCH_TASK,  POST_TASKS, SIGNUP } from "./actionTypes";

export const getTasks = () => (dispatch) => {
    dispatch({ type: LOADING });
    fetch("https://backend-greenmentor.onrender.com/tasks", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem('token')}`
        },
    }).then(res => res.json())
        .then(res => {
            dispatch({type:GET_TASKS,payload:res})
        })
        .catch(err => dispatch({ type: ERROR }));
};

export const postTasks = (newTask) => (dispatch) => {
    dispatch({ type: LOADING });
    fetch("https://backend-greenmentor.onrender.com/tasks/create",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newTask) 
    }).then(res=> res.json())
    .then(res=> {
        dispatch({type:POST_TASKS,payload:newTask})
        alert("New Task Added")
    })
    .catch(err=> dispatch({ type: ERROR }));
};

export const patchTask = (id,updatedTask) => (dispatch) => {
    return (dispatch({ type: LOADING }),
    fetch(`https://backend-greenmentor.onrender.com/tasks/update/${id}`,{
        method:"PATCH",
        headers:{
            "Content-type":"application/json",
            "authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedTask) 
    }).then(res=> res.json())
    .then(res=> {
        console.log(res)
        if(res.msg == "You are not Authorized") alert("You are not Authorized . you can't update or delete other's tasks")
        dispatch({type:PATCH_TASK})
    })
    .catch(err=> dispatch({ type: ERROR }))
    )
};

export const deleteTask = (id) => (dispatch) => {
    return (dispatch({ type: LOADING }),
    fetch(`https://backend-greenmentor.onrender.com/tasks/delete/${id}`,{
        method:"DELETE",
        headers:{
            "Content-type":"application/json",
            "authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=> res.json())
    .then(res=> {
        console.log(res)
        if(res.msg == "You are not Authorized"){
            return alert("You are not Authorized . you can't update or delete other's tasks")
        }
        if(res.msg == "This is Token is Expired please Login") {
            return alert("Please Login ")
        }
        dispatch({type:DELETE_TASK});
        alert("Task has been deleted successfully")
    })
    .catch(err=> dispatch({ type: ERROR })))
};


export const login = (user,navigate) => (dispatch) => {

    dispatch({ type: LOADING });
    fetch("https://backend-greenmentor.onrender.com/users/login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(res=> res.json())
    .then(res=> {
        console.log(res)
        if(res.msg !="Login successful") {
            return alert(res.msg);
        }else{
            localStorage.setItem("token",res.token);
            dispatch({type:LOGIN,payload:res});
            alert("Login Success redirecting to home");
            navigate("/");
        }
    })
    .catch(err=> dispatch({ type: ERROR }))
}

export const signup = (user,navigate) => (dispatch) => {
    dispatch({ type: LOADING });

     fetch("https://backend-greenmentor.onrender.com/users/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(res => {
        // console.log(res);
        if(res.msg =="This email address is already used please login") {
            return alert("This email address is already used please login");
        }else{
            localStorage.setItem("token", res.token);
            dispatch({ type: SIGNUP});
            alert("Signup Success redirecting to login");
            navigate("/login");
        }
      
    })
    .catch(err => { dispatch({ type: ERROR }); });
};

export const logout = (navigate) => (dispatch) => {
    dispatch({ type: LOADING });

     fetch("https://backend-greenmentor.onrender.com/users/logout", {
        method: "get",
        headers: {
            "Content-type": "application/json",
            "authorization": `Bearer ${localStorage.getItem('token')}`
        },
    })
    .then(res => res.json())
    .then(res => {
        alert("Logout Success redirecting to login")
        navigate("/login");
        dispatch({type:LOGOUT})
    })
    .catch(err => { dispatch({ type: ERROR }); });
};