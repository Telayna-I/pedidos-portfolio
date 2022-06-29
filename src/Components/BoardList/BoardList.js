import React from 'react'
import './BoardList.css'
import Order from '../Order/Order';

const BoardList = ( { orders } ) => {
    console.log(orders)
    return(
        <div className = "pedidos">
            {/* {orders.map((order)=>{
                return <Order pedido = {order} key = {order.id}/>
            })} */}
            {orders.map((order)=>(
                <Order pedido = {order} key = {order.id}/>
            ))}
        </div>
    );
}

export default BoardList