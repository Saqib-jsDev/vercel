import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({children}){
const userInfo =    localStorage.getItem("userInfo")    
    if(!userInfo) {
        return <Navigate  to="/login"/>;
    }
return children;

}