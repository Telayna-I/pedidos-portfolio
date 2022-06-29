import { createContext, useContext, useState } from "react";
import { addDoc, collection,  Timestamp, getDocs  } from 'firebase/firestore'
import { dataBase } from "../Services/Firebase/firebase";



export const OrderContext = createContext();

export const useOrder = () => {
    const context = useContext(OrderContext);
    return context
}



const OrderContextProvider = ( { children } ) => {

    const [idPedido, setIdPedido] = useState()


    
    const listOrders = () => {
        return new Promise((resolve, reject)=>{
            const collectionRef = collection(dataBase, 'orders');
            getDocs(collectionRef).then(response => {
                const pedidos = response.docs.map(doc => {
                    return { id : doc.id, ...doc.data() }
                })
                const pedidosOrdenados = pedidos.sort((a, b) => new Date(a.order.fecha).getTime() - new Date(b.order.fecha).getTime());
                resolve(pedidosOrdenados)

            }).catch((err)=>{
                reject(err)
            })
        })
    }










    const confirmOrder = (data) => {
        const objOrder = {
            order: {
                nombre: data.nombre,
                producto: data.producto,
                kilos: data.kilos,
                telefono: data.phone,
                senia: data.senia,
                fecha: data.date,
                hora: data.hora,
                notas: data.notas,
                date: Timestamp.fromDate(new Date()).toDate().toString()
            },
            estado: false,
            vendedor: JSON.parse(sessionStorage.getItem("vendedor")),
        }
        
        const generateOrder = ()=>{
            addDoc(collection(dataBase,'orders'), objOrder).then(({id}) =>{
                setIdPedido(id)
            }).catch((err)=>{
                console.log(err)
            })
            
        }
        
        generateOrder()
    }

    const modificar = () => {
        
    }










    return (
        <OrderContext.Provider value = {{ confirmOrder, idPedido, listOrders }}>
            { children }
        </OrderContext.Provider>
    );
}

export default OrderContextProvider