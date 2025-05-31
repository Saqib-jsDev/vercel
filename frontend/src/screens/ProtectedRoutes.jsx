import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useNotes from "../../src/customHooks/useNotes"

export default function ProtectedRoute({children}){
const {userInfo }=   useNotes()    
    if(!userInfo) {
        return <Navigate  to="/login"/>;
    }
return children;

}