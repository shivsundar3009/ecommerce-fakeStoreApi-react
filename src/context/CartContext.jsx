import { useContext , createContext , useState} from "react";

export const CartContext = createContext()

export const CartContextProvider = ({children}) => {

    const [cartItems , setCartItems] = useState([])

    const addToCart = (productId) => {

        setCartItems(
            (prevItem) => {
                const existingItem = prevItem.find(item => item.productId === productId)

                if(existingItem){
                      
                    return (
                        prevItem.map(item => item.productId === productId ? { ...item , quantity: item.quantity + 1} : item
                    ))
                
                } else {
                    return [...prevItem, {productId, quantity: 1}]
                }
            }
        )

    }
    
    const updateQuantity = (productId, change) => {

        setCartItems(
            prevItem => {
                prevItem
                .map(item => item.productId === productId ? {...item , quantity: item.quantity + change} : item)
                .filter(item => item.quantity >0)
            }
        )

        
    }

    const removeItemFromCart = (productId) => {

        setCartItems(prevItem => prevItem.filter(item => item.productId!== productId))

    }

    const clearCart = (productId) => {
        setCartItems([])
    }


    return (

        <CartContext.Provider value={{cartItems , addToCart , updateQuantity , removeItemFromCart , clearCart}}>
            {children}
        </CartContext.Provider>
    )

}

export default function useCart(){
    return useContext(CartContext) }