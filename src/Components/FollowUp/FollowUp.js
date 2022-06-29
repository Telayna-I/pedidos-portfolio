import React, { useEffect, useState } from 'react'
import './FollowUp.css'
import { useForm } from 'react-hook-form';
import { dataBase } from '../../Services/Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { MdDangerous } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const FollowUp = () => {

    
    const {register, formState :{errors} , handleSubmit} = useForm();
    
    const [order, setOrder] = useState({})
    const [processingOrder, setProcessingOrder] = useState(false)

    const refresh = () => {
        window.location.reload(false);
    }

    const rastrearPedido = (data) => {
        setProcessingOrder(true)
        const docRef = doc(dataBase, 'orders', data.id);
        
        getDoc(docRef).then( response =>{
            const order = {id:response.id,  ...response.data()}
            setOrder(order)
            console.log(order)
        }).catch((err)=>{
            console.log(err.code)
        }).finally(()=>{
            setProcessingOrder(false)
        })
    }

    // console.log(order.length)
    if(processingOrder){
        return(
            <div className='buscando'>
                <h2 className='rastrear-title'>Buscando...</h2>
            </div>
        )
    }
    if(!order.vendedor){
        return (
            <div className='follow-container'>
                <h2 className='rastrear-title'>Ver estado de tu pedido</h2>
                <form className='' onSubmit ={handleSubmit(rastrearPedido)}>
                    <input className='input-form rastrear pedido' type = 'text'
                        autoComplete = 'off'
                        placeholder = 'Introduce el codigo de pedido'
                        name='id'
                        {...register('id', {
                            required:{
                                value: true,
                                message: 'Por favor introduzca un codigo',
                            },
                            minLength: {
                                value: 20,
                                message: "El codigo debe tener 20 caracteres"
                            },
                            maxLength: {
                                value: 20,
                                message: "El codigo posee mas de 20 caracteres"
                            }
                        })}/>
                        <button type="submit" value="submit" className = 'button-submit rastrear-btn'> Ver estado</button>
                </form>
                    <div className='messages'>
                        <div className='message'>
                            {errors.id && <span className='error-message'>{errors.id.message}</span>}
                            <div className = 'caja-boton'>
                                {errors.id && <MdDangerous className='icon-error'/>}
                            </div>
                        </div>
                    </div>
            </div>
    
            
        )
    }else{
        return(
            <div className='order-container'>
                <div className='order-item'>
                    <h2 className='order-title'>Estimado/a {order.order.nombre}</h2>
                    {order.estado ? <p>Su pedido esta listo!</p> : <p>Su pedido estara listo pronto ⏳⏳⏳</p>}
                    {order.estado && <p>Consulta si ya esta en el local 😳👉👈</p>}
                    {order.estado && <p className='flecha'>↓</p>}
                    {order.estado && <a href='https://wa.me/542932517805' className='btn-wsp' target={'_blank'}>Iniciar conversacion en Whatsapp</a>}
                    <button className='btn-wsp' onClick={refresh}>Volver a rastrear pedido</button>
                </div>
            </div>
        )
    }
}

export default FollowUp