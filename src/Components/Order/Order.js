import React, { useEffect, useState } from 'react'
import './Order.css'
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { dataBase } from '../../Services/Firebase/firebase';
import { writeBatch, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form'
import { FaPhoneAlt, FaCalendarAlt, FaRegMoneyBillAlt, FaBalanceScale, FaShoppingCart, FaClock} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdDangerous, MdContentCopy } from "react-icons/md";


const Order = ( { ...order } ) => {
    const { pedido } = {...order}

    const batch = writeBatch(dataBase);

    const [edit, setEdit] = useState()

    const {register, formState :{ errors } , handleSubmit} = useForm();
    
    const listo = () => {
        getDoc(doc(dataBase, 'orders', pedido.id)).then(response =>{
            if(response.data().estado === false){
                batch.update(doc(dataBase, 'orders', response.id), {
                    estado: true
                })
            }else{
                batch.update(doc(dataBase, 'orders', response.id), {
                    estado: false
                })
            }
            batch.commit().then(()=>{
                window.location.reload(false);
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    const eliminar = async () => {
        await deleteDoc(doc(dataBase, "orders", pedido.id)).then(()=>{
            window.location.reload(false);
        })
    }

    const formulario = () => {
        setEdit(true)
    }

    const editar = (data) => {
        getDoc(doc(dataBase, 'orders', pedido.id)).then(response =>{
            batch.update(doc(dataBase, 'orders', response.id), {
                order: {
                    nombre: data.nombre,
                    producto: data.producto,
                    kilos: data.kilos,
                    telefono: data.phone,
                    senia: data.senia,
                    fecha: data.date,
                    hora: data.hora,
                    notas: data.notas,
                },
            })
            batch.commit().then(()=>{
                window.location.reload(false);
            })
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setEdit(false)
        })
    }

    useEffect(()=>{

    },[edit])
    
    if(edit){
        return (
            <div className = 'main'>
                <h2 className ='h2-login'>Generar Pedido</h2>
                <div className = "log-in-container">
                    <form className='form-login' onSubmit ={handleSubmit(editar)}>
                        <div className = 'campo radius-t arriba'>
                            <CgProfile/>
                            <input className='input-form radius-t' type = 'text'
                            autoComplete = 'off'
                            placeholder = 'Nombre y apellido'
                            name='nombre'
                            input defaultValue={pedido.order.nombre}
                            {...register('nombre', {
                                required:{
                                    value: true,
                                    message: 'El campo nombre es requerido',
                                },
                                minLength:{
                                    value: 6,
                                    message: 'Introduce un nombre valido'
                                }
                            })}/>
                        </div>
                        <div className='campo  arriba'>
                            <FaShoppingCart/>
                            <input className='input-form radius-t' type = 'select'
                                autoComplete = 'off'
                                placeholder = 'Producto a encargar'
                                name='producto'
                                input defaultValue={pedido.order.producto}
                                {...register('producto', {
                                    required:{
                                        value: true,
                                        message: 'El campo producto es requerido',
                                    },
                                    minLength:{
                                        value: 5,
                                        message: 'Introduce un producto valido'
                                    }
                                })}/>
                        </div>
                        <div className = 'campo  arriba'>
                            <FaBalanceScale/>
                            <input className='input-form radius-t' type = 'text'
                            autoComplete = 'off'
                            placeholder = 'Kilos'
                            name='kilos'
                            input defaultValue={pedido.order.kilos}
                            {...register('kilos', {
                                minLength:{
                                    value: 1,
                                    message: 'Introduce un peso valido'
                                },
                                pattern: {
                                    value:  /^[0-9]*(\.?)[ 0-9]+$/,
                                    message: "El peso debe ser expresado en numeros"
                                }
                            })}/>
                        </div>
                        <div className = 'campo  arriba'>
                            <FaPhoneAlt/>
                            <input className='input-form radius-t' type = 'text'
                            autoComplete = 'off'
                            placeholder = 'Telefono'
                            name='phone'
                            input defaultValue={pedido.order.telefono}
                            {...register('phone', {
                                required:{
                                    value: true,
                                    message: 'El campo telefono es requerido',
                                },
                                minLength: {
                                    value: 10,
                                    message: "El telefono debe tener al menos 10 caracteres"
                                },
                                pattern: {
                                    value: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
                                    message: "El formato de telefono no es correcto"
                                }
                            })}/>
                        </div>
                        <div className = 'campo  arriba'>
                            <FaRegMoneyBillAlt/>
                            <input className='input-form radius-t' type = 'text'
                            autoComplete = 'off'
                            placeholder = 'Seña'
                            name='senia'
                            input defaultValue={pedido.order.senia}
                            {...register('senia', {
                                pattern: {
                                    value:  /^[0-9]*(\.?)[ 0-9]+$/,
                                    message: "La seña debe ser expresada solo en numeros"
                                }
                            })}/>
                        </div>
                        <div className = 'campo  arriba ultimo'>
                            <FaCalendarAlt className='date'/>
                            <input className='input-form radius-t' type = 'date'
                            autoComplete = 'off'
                            name='date'
                            input defaultValue={pedido.order.fecha}
                            {...register('date', {
                                required:{
                                    value: true,
                                    message: 'El campo fecha es requerido',
                                },
                                minLength: {
                                    value: 10,
                                    message: "Ingresa una fecha valida"
                                }
                            })}/>
                        </div>
                        <div className = 'campo  arriba'>
                            <FaClock/>
                            <input className='input-form radius-t' type = 'text'
                            autoComplete = 'off'
                            placeholder = 'Hora'
                            name='hora'
                            input defaultValue={pedido.order.hora}
                            {...register('hora', {
                                required:{
                                    value: true,
                                    message: 'El campo hora es requerido',
                                },
                                pattern: {
                                    value:  /^[0-9]*(\.?)[ 0-9]+$/,
                                    message: "La hora debe ser expresada solo en numeros"
                                }
                            })}/>
                        </div>
                        <div className = 'campo radius-b abajo ultimo'>
                            <textarea className='input-form radius-t'
                            placeholder='Notas...'
                            autoComplete = 'off'
                            name='notas'
                            rows={'6'}
                            input defaultValue={pedido.order.notas}
                            {...register('notas', {
                                required:{
                                    value: true,
                                    message: 'El campo notas es requerido',
                                },
                                minLength: {
                                    value: 10,
                                    message: "Ingresa una nota valida"
                                },
                            })}/>
                        </div>
    
                        <button type="submit" value="submit" className = 'button-submit'> Editar </button>
                    </form>
                </div>
                <div className='messages'>
                    <div className='message'>
                        {errors.nombre && <span className='error-message'>{errors.nombre.message}</span>}
                        <div className = 'caja-boton'>
                            {errors.nombre && <MdDangerous className='icon-error'/>}
                        </div>
                    </div>
                    <div className='message'>
                        {errors.producto && <span className='error-message'>{errors.producto.message}</span>}
                        <div className = 'caja-boton'>
                            {errors.producto && <MdDangerous className='icon-error'/>}
                        </div>
                    </div>
                    <div className='message'>
                        {errors.kilos && <span className='error-message'>{errors.kilos.message}</span>}
                        <div className = 'caja-boton'>
                            {errors.kilos && <MdDangerous className='icon-error'/>}
                        </div>
                    </div>
                    <div className='message'>
                        {errors.phone && <span className='error-message'>{errors.phone.message}</span>}
                        <div className = 'caja-boton'>
                            {errors.phone && <MdDangerous className='icon-error'/>}
                        </div>
                    </div>
                    <div className='message'>
                        {errors.senia && <span className='error-message'>{errors.senia.message}</span>}
                        <div className = 'caja-boton'>
                            {errors.senia && <MdDangerous className='icon-error'/>}
                        </div>
                    </div>
                    <div className='message'>
                        {errors.date && <span className='error-message'>{errors.date.message}</span>}
                        <div className = 'caja-boton'>
                            {errors.date && <MdDangerous className='icon-error'/>}
                        </div>
                    </div>
                    <div className='message'>
                        {errors.notas && <span className='error-message'>{errors.notas.message}</span>}
                        <div className = 'caja-boton'>
                            {errors.notas && <MdDangerous className='icon-error'/>}
                        </div>
                    </div>
                    <div className='message'>
                        {errors.hora && <span className='error-message'>{errors.hora.message}</span>}
                        <div className = 'caja-boton'>
                            {errors.hora && <MdDangerous className='icon-error'/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div  className='card'>
            <div className={`header-card ${pedido.estado ? 'ped-listo' : '' } `}>
                <h2 className='card-title'><span>Apellido:</span> {pedido.order.nombre}</h2>
                <p className='card-date'><span>Fecha de entrega:</span> <span className='span-fecha'>{pedido.order.fecha}</span></p>
            </div>
            <div className='detalle'>
                <p className='producto'><span>Producto encargado:</span> {pedido.order.producto}</p>
                {pedido.order.kilos !== '' && <p className='kilos'><span>Kilos:</span> {pedido.order.kilos}Kg.</p>}
                {pedido.order.senia !== '' && <p className='senia'><span>Seña:</span> $ {pedido.order.senia}</p>}
                <p className='hora'><span>Hora:</span> {pedido.order.hora}</p>
                <p className='hora'><span>Telefono:</span> {pedido.order.telefono}</p>
                <p className='vendedor'><span>Vendedor:</span> {pedido.vendedor}</p>
                <p className='hora'><span>Codigo de seguimiento:</span> {pedido.id}</p>
                <div className='notas-container'>
                    <p className='notas'><span>Notas:</span> {pedido.order.notas}</p>
                </div>
            </div>
            <div className='acciones'>
                <button className='btn-acc' onClick={eliminar}><MdOutlineClose className='eliminar' />Eliminar</button>
                <button className='btn-acc' onClick={formulario}><FaEdit className='editar' />Modificar</button>
                <button className='btn-acc' type='submit' onClick={listo} ><FaCheckCircle className='listo' />Listo</button>
            </div>
        </div>
    );
}

export default Order