import React from 'react'
import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar, } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CartState } from '../context/Context'

function Header() {
    const {state: {cart},dispatch,productDispatch} = CartState();
    return (
        <Navbar bg='dark' variant='dark' style={{ height:80 }}>
            <Container>
                <Navbar.Brand>
                    <Link to="/"> Momo and Cake Shop </Link>
                </Navbar.Brand>
                    <Navbar.Text className="search">
                        <FormControl style={{ width: 500}}
                        placeholder='Search a Momo' 
                        className='m-auto'
                        onChange={(e) => {
                            productDispatch({
                            type: "FILTER_SEARCH",
                            payload: e.target.value,
                            });
                        }}/>
                    </Navbar.Text>
                    <Nav>
                        <Dropdown align='left'>
                        <Dropdown.Toggle variant='success'>
                            <FaShoppingCart color='white' size='25px' />
                            <Badge>{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 300}}>
                            {cart.length > 0 ? (
                                <>
                                {cart.map((prod) => (

                                <span className='cartItem' key={prod.id}>
                                <img src={prod.image}
                                className="cartItemImg" alt={prod.name}
                                />
                                <div className='cartItemDetail'>
                                    <span>{prod.name}</span>
                                    <span>{prod.price.split(".")[0]}</span>
                                </div>
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
                                </span>
                                ))}
                                <Link to="/cart">
                                    <Button style={{ width: "90%", margin: "0 10px"}}>
                                        View Cart
                                    </Button>
                                </Link>
                                
                                </>
                            ):(
                                <span style={{ padding: 10}}>Cart is Empty</span>
                            )}
                            
                        </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                
            </Container>
        </Navbar>
    )
}

export default Header
