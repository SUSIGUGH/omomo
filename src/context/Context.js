
import { createContext, useContext, useReducer } from "react"
import { cartReducer, productReducer } from "./Reducers";
import momo1 from '../momos/momo1.png'
import momo2 from '../momos/momo2.png'
import momo3 from '../momos/momo3.png'
import momo4 from '../momos/momo4.png'
const Cart = createContext();


const Context = ({ children }) => {
    const products = [
        {
            id: 1,
            name: "Steam Momo",
            price: "100",
            image: momo1,
            inStock: 5,
            fastDelivery: true,
            ratings: 2,

        },
        {
            id: 2,
            name: "Fried Momo",
            price: "125",
            image: momo2,
            inStock: 5,
            fastDelivery: true,
            ratings: 2,

        },
        {
            id: 3,
            name: "Steam Special Momo",
            price: "125",
            image: momo3,
            inStock: 5,
            fastDelivery: true,
            ratings: 2,

        },
        {
            id: 4,
            name: "Fried Special Momo",
            price: "125",
            image: momo4,
            inStock: 5,
            fastDelivery: true,
            ratings: 2,

        },
    ]
    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart:[],
    });
    const [productState, productDispatch ] = useReducer(productReducer, {
        byStock: true,
        byFastDelivery: true,
        byRating: 0,
        searchQuery: "",
    });
    return <Cart.Provider value={{state, dispatch,productState,productDispatch}}>{children}</Cart.Provider>;
        
};

export default Context
export const CartState = () => {
    return useContext(Cart);
}
