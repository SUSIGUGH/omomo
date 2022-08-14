import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context'
import Rating from './Rating';

const Cart = () => {
    const { state:{ cart }, dispatch,} = CartState();
    const [ total, setTotal,] = useState();
    useEffect(() => {
        setTotal(cart.reduce((a, c) => a + Number(c.price) * c.qty,0));
    },[cart]); 
    return (
        <div className='home'>
            <div className='productContainer'>
                <ListGroup>
                    {cart.map((prod => (
                        <ListGroup.Item key={prod.id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={prod.image} alt={prod.name} fluid rounded />
                                </Col>
                                <Col md={2}>
                                <span>{prod.name}</span>
                                </Col>
                                <Col md={2}>
                                {prod.price}
                                </Col>
                                <Col md={2}>
                                <Rating rating={prod.ratings} />
                                </Col>
                                <Col md={2}>
                                    <Form.Control as="select" values={prod.qty}
                                    onChange={(e) =>
                                    dispatch(
                                        {
                                            type: "CHANGE",
                                            payload: {
                                                id: prod.id,
                                                qty: e.target.value,
                                            },
                                        }
                                    )}>
                                        {[...Array(prod.inStock).keys()].map((x) => (
                                            <option key={x + 1}>{x + 1}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                <AiFillDelete
                                fontSize="20px"
                                style={{ cursor: "ponter"}}
                                onClick={() =>
                                    dispatch({
                                        type: "REMOVE",
                                        payload: prod,
                                    })
                                } 
                                />
                                </Col>
                            </Row>
                             

                        </ListGroup.Item>
                       
                    )))}
                </ListGroup>
            </div>
            <div className='filters summary'>
                <span className='title'> Subtotal ({cart.length}) Items</span>
                <span style={{ fontWeight: 700, fontSize: 20}}> Total: {total}</span>
                  <Button type="button" disabled={cart.length === 0}>
                  <Link to="/checkout"> Check Out </Link>
                </Button>  
            </div>
        </div>
    )
    
};

export default Cart
