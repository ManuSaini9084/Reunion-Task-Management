
import { useSelector } from "react-redux"
import { Navigate} from "react-router-dom"

const PrivateRoute =({children})=>{
    const token = useSelector(store => store.token)
    let isAuth = token || localStorage.getItem("token") ;
    if(isAuth == undefined) isAuth=""

    if (!isAuth)  return <Navigate to="/login"/>
    return <>{children}</>;
}

export {PrivateRoute}