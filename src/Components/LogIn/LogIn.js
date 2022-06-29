import './LogIn.css'
import { useForm } from 'react-hook-form'
import { FaEnvelope, FaKey } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const LogIn = () => {

    const {register, formState :{errors} , handleSubmit} = useForm();
    const { logIn, loged, error } = useAuth();
    const navigate = useNavigate();

    const onLogIn = async (data) =>{
        try{
            await logIn(data.email, data.password)
        }catch(err){
            console.log(err.message)
        }
        navigate('/board')
    }


    return(
        <div className = 'main'>
            <h2 className ='h2-login'>Inicia Sesion</h2>
            <form className='form-login' onSubmit ={handleSubmit(onLogIn)}>
                <div className = 'campo radius-t arriba'>
                    <FaEnvelope/>
                    <input className='input-form radius-t' type = 'text'
                    autoComplete = 'on'
                    placeholder = 'Email'
                    name='email'
                    {...register('email', {
                        required:{
                            value: true,
                            message: 'El campo email es requerido',
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "El formato de email no es correcto"
                        }
                    })}
                    />
                </div>
                <div className='campo radius-b'>
                    <FaKey/>
                    <input className='input-form radius-b' type = 'password'
                    autoComplete = 'off'
                    placeholder = 'Contraseña'
                    name='password'
                    {...register('password', {
                        required:{
                            value: true,
                            message: 'El campo password es requerido',
                        },
                        minLength: {
                            value: 8,
                            message: "La contraseña debe tener al menos 8 caracteres"
                        }
                    })}
                    />
                </div>
                <button type="submit" value="submit" className = 'button-submit'> Iniciar Sesión</button>
            </form>
            <div className='messages'>
                <div className='message'>
                    {errors.email && <span className='error-message'>{errors.email.message}</span>}
                    <div className = 'caja-boton'>
                        {errors.email && <MdDangerous className='icon-error'/>}
                    </div>
                </div>
                <div className='message'>
                    {errors.password && <span className='error-message'>{errors.password.message}</span>}
                    <div className = 'caja-boton'>
                        {errors.password && <MdDangerous className='icon-error'/>}
                    </div>
                </div>
            </div>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default LogIn