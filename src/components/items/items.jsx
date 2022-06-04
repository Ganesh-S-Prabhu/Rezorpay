import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './items.css'

export const ItemDisplay=()=>{
const {id}=useParams();
    const [item,setitem]=useState({});
    const [qty,setqty]=useState(1);
   useEffect(()=>{
       getdata();
   },[])

   const getdata=async()=>{
let res=await fetch(`http://localhost:9000/items/${id}`)
let data=await res.json();
setitem(data);
   }

   const handladd=async(id)=>{
       let data={
           qty:qty,
           itemid:id
       }
       let res=await fetch("http://localhost:9000/addtocart",{
           method:"POST",
           headers:{
            "content-type": "application/json",
           },
           body: JSON.stringify(data)

       })
       let datas=await res.json();
       console.log(datas)
   }



   
    
    return(
        <div className="i-main">
            <div className="i-display">
            <div className="i-item">
                    <img src={item.img} alt="" />

                    <h3 className="i-item-name">Item Name:{item.name}</h3>
                    <h3 className="i-item-price">Price: ₹{item.price}</h3>
                    <input type="number" placeholder='Enter Quantity' defaultValue={1} name="qty" onChange={(e)=>{
                        setqty(e.target.value)
                    }}/>
                    <br />
                    <button className='i-button' onClick={()=>handladd(item._id)}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}