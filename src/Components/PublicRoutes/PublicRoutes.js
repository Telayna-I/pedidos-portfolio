import { useAuth } from "../../Context/AuthContext"
import { Outlet } from "react-router-dom"
import Board from "../Board/Board";

const PublicRoutes = () => {
    
    const { loged } = useAuth();

    return !loged ? <Outlet/> : <Board/>

}

export default PublicRoutes