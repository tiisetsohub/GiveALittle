import React, { useContext } from 'react';
import { NameContext, LoginContext, CartContext } from '../Context'
//ignore page

export default function About() {
    const { name, setName } = useContext(NameContext)
    const { login, setLogin } = useContext(LoginContext)
    const { cart, setCart } = useContext(CartContext)

    const today = new Date();

    return (
        <div>
            <h1>Givealittle</h1>
            <p>Copyright &copy; {today.getFullYear()}</p>
        </div>
    )
}