
import { useEffect, useState } from 'react'
import './homepage.css'
import { Link } from 'react-router-dom';

export const Homepage=()=>{
    const [itemslist,setitemslist]=useState([]);
    useEffect(()=>{
        gatdata();
    },[])

    const gatdata=async()=>{
        let res=await fetch("http://localhost:9000/items");
        let data=await res.json();
        console.log(data)
        setitemslist(data);
    }

    return(
        <div id="h-main">
            <div id="h-display">
                {itemslist.map(e=>{
                    return(
                        <Link to={`/item/${e._id}`} className="n-home"  style={{ textDecoration: 'none' }} key={e._id}>
                        <div className="h-item" key={e._id}>
                        <img src={e.img} alt="" />
                        <h3 className="item-name">Item Name:{e.name} </h3>
                        <h3 className="item-price">Price: ₹{e.price}</h3>
                        
                    </div>
                    </Link>
                    )
                })}
               
                
            </div>
        </div>
    )
}