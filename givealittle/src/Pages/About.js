import React, { useContext } from 'react';
import { NameContext, LoginContext, CartContext } from '../Context'

export default function About() {
    const { name, setName } = useContext(NameContext)

    return (
        <div>
            <h3 className='about_details'>
                This Is About Page, 
            </h3>
        </div>
    )
}