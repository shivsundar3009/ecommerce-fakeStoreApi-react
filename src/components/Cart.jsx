import React from 'react'
import useCart from '../context/CartContext'

function Cart() {

  const { cartItems } = useCart()

  console.log(cartItems);
 

  return (


     <div> {cartItems?.quantity}</div>
   
    
  )
}

export default Cart