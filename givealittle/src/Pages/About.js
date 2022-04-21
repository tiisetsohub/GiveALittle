import React, { useContext } from 'react';
import { NameContext, LoginContext, CartContext } from '../Context'
//ignore page

export default function About() {
    const { name, setName } = useContext(NameContext)
    const { login, setLogin } = useContext(LoginContext)
    const { cart, setCart } = useContext(CartContext)

    return (
        <div>
            {login ?
                <div>
                    <h1>hi there </h1>
                    <h1>{cart[0].Name}</h1>
                </div>
                : <h1>Get outta here</h1>}
            <button onClick={() => setLogin(!login)}>click me</button>
        </div>
    )
}