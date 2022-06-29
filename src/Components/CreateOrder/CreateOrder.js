import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaCalendarAlt, FaRegMoneyBillAlt, FaBalanceScale, FaShoppingCart, FaClock} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdDangerous } from "react-icons/md";
import { useOrder } from '../../Context/OrderContext';


const CreateOreder = () => {
    const { confirmOrder } = useOrder()

    const {register, formState :{ errors } , handleSubmit} = useForm();
    
    const navigate = useNavigate();
    

    
    const encargar = async (data) => {
        try{
            await confirmOrder(data)
            
            navigate('/board')
            
        }catch(err){
            console.log(err)
        }
    }

    

    return (
        <div className = 'main'>
            <h2 className ='h2-login'>Generar Pedido</h2>
            <div className = "log-in-container">
                <form className='form-login' onSubmit ={handleSubmit(encargar)}>
                    <div className = 'campo radius-t arriba'>
                        <CgProfile/>
                        <input className='input-form radius-t' type = 'text'
                        autoComplete = 'off'
                        placeholder = 'Nombre y apellido'
                        name='nombre'
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

                    <button type="submit" value="submit" className = 'button-submit'> Encargar </button>
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

export default CreateOreder