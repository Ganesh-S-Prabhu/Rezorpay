import { Link } from "react-router-dom"
import React from "react"
import './navbar.css'

 export const Navbar=()=>{
    return(
        <div id="n-main">
            <div id="n-display">
            <Link to={"/"} className="n-home"  style={{ textDecoration: 'none' }}>
           <h1>Home</h1>
          </Link>
          <Link to={"/cartPage"} className="n-cartpage" style={{ textDecoration: 'none' }}>
            <h1>Cart</h1>
          </Link>
            </div>
        </div>
    )
}