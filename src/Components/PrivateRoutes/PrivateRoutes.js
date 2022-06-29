import { useAuth } from "../../Context/AuthContext"
import { Outlet } from "react-router-dom"
import LogIn from "../LogIn/LogIn";

const PrivateRoutes = () => {

    const { loged } = useAuth();

    return loged ? <Outlet/> : <LogIn/>


}

export default PrivateRoutes