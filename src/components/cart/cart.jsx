import { useEffect, useState } from 'react'
import './cart.css'


function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

export const Cartpage=()=>{

    const [addtocart,setaddtocart]=useState([]);
    const [givedata,setgivedata]=useState({})
    
    useEffect(()=>{
          getdata();
    },[])

    const getdata=async()=>{
        let res=await fetch("http://localhost:9000/addtocart");
        let data=await res.json();
        setaddtocart(data);
    }

    const placeorder=async()=>{
        let obj={
            "amount":sumall,
            "currency": "INR"
        }
        let res=await fetch("http://localhost:9000/razorpay",{
            method:"POST",
            headers:{
                "content-type": "application/json",
               },
               body: JSON.stringify(obj)
        })
        let data=await res.json();
        console.log(data)
        setgivedata(data);
    }

    const sumall = addtocart.reduce((prev, curr) => prev +(curr.itemid.price*curr.qty) , 0);

    

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
        let obj={
            "amount":sumall*100,
            "currency": "INR"
        }

		const data = await fetch('http://localhost:9000/razorpay', {  
        method:"POST",
        headers:{
            "content-type": "application/json",
           },
           body: JSON.stringify(obj) })
           .then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: __DEV__ ? 'rzp_test_0nlLfnUNaVjc96' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Order',
			description: 'Thank you for Ordering',
			
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}
    

    return(
        <div id="c-main">
            <div id="c-total"><h1>Total: ₹{sumall}  </h1></div>
            <div className="c-display">
                {addtocart.map(e=>{
                    return(
                        <div className="c-item" key={e._id}>
                    <img src={e.itemid.img} alt="" />
                    <h3 className="c-item-name">Item Name:{e.itemid.name}</h3>
                    <h3 className="c-qty">Quantity:{e.qty}</h3>
                    <h3 className="c-item-price">Price: ₹{e.itemid.price}</h3>
                </div>
                    )
                })}
                
                
            </div>
            <div><button className='c-button' onClick={displayRazorpay}>Place Order</button></div>
        </div>
    )
}