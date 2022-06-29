import { NavLink } from 'react-router-dom'
import './NavBar.css'
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { useRef } from 'react';
import { useAuth } from '../../Context/AuthContext';

const NavBar = () => {

    const { logOut, loged, setLoged } = useAuth()
    
    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle('responsive_nav')
    }


    const signOut = async() => {
        try{
            await logOut()
            setLoged(false)
        }catch(err){
            console.log(err.code)
        }
    }

    

    return(
        <header>
            <NavLink to = {`/login`} className = "logo">La Repostera</NavLink>
            <nav ref={navRef}>
                { loged === true &&
                <NavLink className = {"nav-link"} onClick={showNavBar}
                to = {`/`} 
                >Home
                </NavLink>
                }
                { loged === true &&
                <NavLink className = {"nav-link"} onClick={showNavBar}
                to = {`/board`} 
                >Tablero
                </NavLink>
                }
                {!loged && 
                <NavLink className = {"nav-link"}
                to = {`/follow-up`} onClick={showNavBar}
                >Seguimiento
                </NavLink>
                }

                {loged && 
                <NavLink className = {"nav-link"}
                to = {`/create-order`} onClick={showNavBar}
                >Generar pedido
                </NavLink>
                }
                
                
                {loged && 
                <div className={"nav-link"} onClick={signOut} >Cerrar sesion</div>}
                <button className='nav-btn nav-close-btn' onClick={showNavBar} > <MdOutlineClose/> </button>
            </nav>
            <button className='nav-btn' onClick={showNavBar} > <FaBars/> </button>
        </header>
    );
}

export default NavBar
