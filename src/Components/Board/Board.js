import { useEffect, useState } from 'react'
import './Board.css'
import { useOrder } from '../../Context/OrderContext'
import BoardList from '../BoardList/BoardList'

const Board = () => {
    
    const { listOrders } = useOrder()

    const [ pedidos, setPedidos] = useState([])
    const [processingOrder, setProcessingOrder] = useState(false)

    useEffect(()=>{
        setProcessingOrder(true)
        listOrders().then(response =>{
            setPedidos(response)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setProcessingOrder(false)
        })
    },[])

    // console.log(orders.orders[0].nombre)


    if(processingOrder){
        return(
            <div className='buscando'>
                <h2 className='rastrear-title'>Buscando...</h2>
            </div>
        )
    }else if (pedidos.length === 0){
            return(
                <div className='buscando'>
                    <h2 className='rastrear-title'>No hay pedidos tomados</h2>
                </div>
            )
    }
    
    return (
        <div className='board-container'>
            {pedidos.length > 0 && <BoardList orders = {pedidos}/>}
        </div>
    )
}

export default Board