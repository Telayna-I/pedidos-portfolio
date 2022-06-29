import { createContext, useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../Services/Firebase/firebase";


export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context
}


const AuthContextProvider = ({ children }) =>{

    const [loged, setLoged] = useState(JSON.parse(sessionStorage.getItem("loged")) || false);

    const [error, setError] = useState()

    const [anoto, setAnoto] = useState(JSON.parse(sessionStorage.getItem("vendedor")) || null);

    useEffect(()=>{
        if(loged === true || loged === 'loged'){
            setLoged(true);
            window.sessionStorage.setItem("loged", JSON.stringify(loged))
            console.log(anoto)
            window.sessionStorage.setItem("vendedor", JSON.stringify(anoto))
        }
    },[loged])

    const logIn = (email,password)=>{
        signInWithEmailAndPassword(auth, email, password).then((response)=>{
            console.log(response._tokenResponse.email)
            setAnoto(response._tokenResponse.email)
            setLoged(true)
        }).catch((err) =>{
            if(err.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta');
            }else if(err.code === 'auth/user-not-found'){
                setError('El email no se encuentra registrado')
            }
            console.log(err.message)
        })
    }


    const logOut = () =>{
        sessionStorage.clear();
        signOut(auth);
        setLoged(false);
    }

    return (
        <AuthContext.Provider value = {{ loged, error, logIn, logOut, setLoged, anoto }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider 