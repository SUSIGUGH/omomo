import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { CartState } from '../context/Context'
import Rating from './Rating'

const Filter = () => {
     // const [rate, setRate] = useState(3);
    const {productState: {byStock, byFastDelivery, sort, byRating, searchQuery}, productDispatch} = CartState();
    console.log(byStock, byFastDelivery, sort, byRating, searchQuery)
    
    return (
       <div className='filters'>
        <span className='title'>Filter Momos </span>
        <span>
            <Form.Check inline label="Ascending"
            name="grp1"
            type="radio"
            id={`inline-1`}
            onClick={()=>
            productDispatch({
                type: "SORT_PRICE",
                payload: "lowToHigh",
            })}
            checked={sort === "lowToHigh" ? true : false}
            />
        </span>
        <span>
            <Form.Check inline label="Descending"
            name="grp1"
            type="radio"
            id={`inline-2`}
            onClick={()=>
                productDispatch({
                    type: "SORT_PRICE",
                    payload: "highToLow",
                })}
                checked={sort === "highToLow" ? true : false}
            />
        </span>
        <span>
            <Form.Check inline label="Include Out of Stock"
            name="grp1"
            type="checkbox"
            id={`inline-3`}
            onClick={()=>
                productDispatch({
                    type: "FILTER_STOCK",
                })}
                checked={byStock}
            />
        </span>
        <span>
            <Form.Check inline label="Fast Delivery Only"
            name="grp1"
            type="checkbox"
            id={`inline-4`}
            onClick={()=>
                productDispatch({
                    type: "FILTER_DELIVERY",
                })}
                checked={byFastDelivery}
            />
        </span>
        <span>
            <label style={{ paddingRight: 10}}>Rating: </label>
            <Rating rating={byRating} onClick={(i) => 
                productDispatch({
                    type: "SORT_RATING",
                    payload: i + 1,})
                 } style={{ cursor: "pointer" }}/>
        </span> 
        <Button variant="light" onClick={()=>
                productDispatch({
                    type: "CLEAR",
                })}> Clear Filters</Button>
       </div> 
    )
}

export default Filter
